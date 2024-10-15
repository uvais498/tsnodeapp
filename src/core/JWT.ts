import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import { sign, verify } from 'jsonwebtoken';
import { InternalError, BadTokenError, TokenExpiredError } from './ApiError';

export class JwtPayload {
  aud: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  prm: string;

  constructor(issuer: string, audience: string, subject: string, param: string, validity: number) {
    this.iss = issuer;
    this.aud = audience;
    this.sub = subject;
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + validity;
    this.prm = param;
  }
}

async function readPublicKey(): Promise<string> {
  return promisify(readFile)(path.join(__dirname, '../../keys/public.pem'), 'utf8');
}

async function readPrivateKey(): Promise<string> {
  return promisify(readFile)(path.join(__dirname, '../../keys/private.pem'), 'utf8');
}

async function encode(payload: JwtPayload): Promise<string> {
  const cert = await readPrivateKey();
  if (!cert) {
    throw new InternalError('Token generation failure');
  }
  // @ts-expect-error descp
  return promisify(sign)({ ...payload }, cert, { algorithm: 'RS256' });
}

/**
 * This method checks the token and returns the decoded data when token is valid in all respect
 */
async function validate(token: string): Promise<JwtPayload> {
  const cert = await readPublicKey();
  try {
    // @ts-expect-error desp
    return (await promisify(verify)(token, cert)) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e && e.name === 'TokenExpiredError') {
      throw new TokenExpiredError();
    }
    // throws error if the token has not been encrypted by the private key
    throw new BadTokenError();
  }
}

/**
 * Returns the decoded payload if the signature is valid even if it is expired
 */
async function decode(token: string): Promise<JwtPayload> {
  const cert = await readPublicKey();
  try {
    // @ts-expect-error desp
    return (await promisify(verify)(token, cert, {
      ignoreExpiration: true
    })) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new BadTokenError();
  }
}

export default {
  encode,
  validate,
  decode
};
