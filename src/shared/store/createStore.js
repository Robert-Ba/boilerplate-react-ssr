import { createStore } from 'redux';

import reducer from '../reducer';

/**
 * Create the redux store server side. Use any additional data provided by the server request.
 *
 * @param {*} preloadedState Any data that should be included in the application state.
 * @param {*} req Express request parameters
 * @returns
 */
const makeStore = (preloadedState = {}, req) => {
  // Possibly put middleware here.
  // TODO: Need cookie? Might want to add user account and handle session state?
  // Possibly create axios instance here.

  console.log(`Create redux store. Req: ${typeof req}`);
  const store = createStore(
    reducer,
    preloadedState,
  );

  return store;
};

export default makeStore;
