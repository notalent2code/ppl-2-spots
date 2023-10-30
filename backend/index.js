import app from './src/app';

function bootstrap(app, port) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap(app, constants.PORT);