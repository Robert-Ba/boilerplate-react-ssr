import React from 'react';
import { renderRoutes } from 'react-router-config';
// import Footer from '../Footer';
// import Header from '../Header';
import routes from '../../../shared/routes';
import './app.css';

/**
 * Entry point. Components here are used across the entire website.
 * Example: Header and footer
 *
 * @returns App component for the requested route.
 */
const App = () => (
  <div className="app-component">
    <div className="app-body">
      {/* <Header /> */}
      {renderRoutes(routes.routeMap)}
    </div>
    {/* <Footer /> */}
  </div>
);

export default App;
