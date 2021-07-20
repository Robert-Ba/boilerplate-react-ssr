// This is where the server side rendering happens
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import App from '../../client/components/App';
import webConfig from '../../../webConfig';

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div className="app">
          {renderRoutes([{ component: App }])}
        </div>
      </StaticRouter>
    </Provider>,
  );

  const helmet = Helmet.renderStatic();

  return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        ${helmet.meta.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="${webConfig.siteURL}/public/css/main.css" rel="stylesheet" type="text/css" />
        ${helmet.title.toString()}
        <link rel="shortcut icon" href="${webConfig.siteURL}/favicon.ico">
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${content}</div>
        <script>
            window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="${webConfig.siteURL}/client_bundle.js"></script>
    </body>
</html>`;
};
