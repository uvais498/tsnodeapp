import Logger from './core/Logger';
import { port, environment } from './config';
import app from './app';

app
  .listen(port, () => {
    Logger.info(`server running on port : ${port}`);
    console.log(environment);
  })
  .on('error', (e) => Logger.error(e));
