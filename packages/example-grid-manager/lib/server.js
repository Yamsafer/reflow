const express              = require('express');
const native               = require('reflow-native');

process.env.PORT="4000";

(async function() {
  try {
    const app = express();
    app.disable('x-powered-by');
    app.enable('trust proxy');

    const nativeMiddleware = await native();

    app.use(nativeMiddleware);

    app.listen(process.env.PORT, function() {
      console.log(`Server Running on port ${process.env.PORT}`)
    });
  } catch(err) {
    throw err;
  }
})()
