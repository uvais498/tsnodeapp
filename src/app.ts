import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ApiError, NotFoundError, InternalError, ErrorType } from './core/ApiError';
import { corsUrl, environment } from './config';
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL) {
      console.log(err);
    } else {
      console.log(err);
    }
    if (environment === 'development') {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});
export default app;
