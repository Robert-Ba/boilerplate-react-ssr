// Start up point for client side app
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import createStore from '../shared/store';
import App from './components/App';

const store = createStore(window.INITIAL_STATE);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter forceRefresh>
      <div className="app">{renderRoutes([{ component: App }])}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
