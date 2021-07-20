import Home from '../../client/components/Home';
import NotFound from '../../client/components/NotFound';

import * as staticRoutes from './staticRoutes';

export default [
  {
    path: staticRoutes.HOME,
    exact: true,
    component: Home,
  },
  {
    path: staticRoutes.NOT_FOUND,
    component: NotFound,
  },
];
