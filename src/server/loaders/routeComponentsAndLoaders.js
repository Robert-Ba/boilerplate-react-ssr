/**
 *  We have a route to component used by react router. On the server side we also want to know which loader
 *  to use for server side rendering. We assign the loaders here. Should be undefined if no loader.
 *  NOTE: This will help separate loaders from client side and prevent webpack from bundling server side code to client bundle.
 * */

/**
 * Route-map for our StaticRouter (https://www.npmjs.com/package/react-router-config).
 * Map component routes to data loaders.
*/
import loadHome from './homeLoader';
import routeComponents from '../../shared/routes/routeComponentMap';
import * as staticRoutes from '../../shared/routes/staticRoutes';

const routesToLoaders = {
  [staticRoutes.HOME]: loadHome,
};

export default routeComponents.map((route) => ({
  ...route,
  loader: routesToLoaders[route.path],
}));
