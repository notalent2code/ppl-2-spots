import app from './src/app';
import constants from './src/config/constants';

function bootstrap(app, port) {
  app.listen(port, () => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap(app, constants.PORT);