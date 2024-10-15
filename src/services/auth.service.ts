/* eslint-disable @typescript-eslint/no-unused-vars */
class AuthService {
  constructor() {
    this.elevatedLogin = this.elevatedLogin.bind(this);
  }
  public async elevatedLogin(
    clientSecret: string,
    clientID: string,
    _scope: string[] = []
  ): Promise<void> {
    const T = 0;
  }
}

export default new AuthService();
