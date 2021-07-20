import express from 'express';
import { matchRoutes } from 'react-router-config';
// import bodyParser from 'body-parser';
// import path from 'path';
import compression from 'compression';
// import favicon from 'serve-favicon';

import routes from './loaders';
import renderer from './helpers/renderer';
import createStore from '../shared/store';
import apiRouter from './apiRouter';

const port = process.env.PORT || 3002;
const app = express();
app.use(compression());

// Use HTTPS
app.enable('trust proxy');
app.use((req, res, next) => {
  const hasFileExtension = req.originalUrl.match(/^.*\.[^\\]+$/);
  if (!hasFileExtension) {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
  }
  if (process.env.NODE_ENV !== 'development' && !req.secure) {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
  return next();
});

app.use(express.static('build/public'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  const store = createStore({}, req);
  const promises = matchRoutes(routes, req.path)
    .map(({ route }) => {
      if (route.loader) {
        return route.loader(store, res.locals);
      }
      return undefined;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch((err) => {
            reject(err);
          });
        });
      }
      return undefined;
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.pageNotFound) {
      res.status(404);
    }

    return res.send(content);
  }).catch((err) => {
    if (err.url) {
      return res.redirect(301, err.url);
    }

    return res.status(400).send('Error: server error.');
  });
});

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
