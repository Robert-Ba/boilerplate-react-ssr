import React from 'react';
import PropTypes from 'prop-types';

import './notFound.css';

/**
 * This component displays when requested page was not found. Show 404 status.
 *
 * TODO:
 * 1. I think it is bad to use props in this way but I've seen that this is how other people
 * are using react router for express to know when to send 404 status.
 *
 * @param {object} staticContext Set notFound to false so that express knows to send 404 status.
 */
const NotFound = ({ staticContext }) => {
  if (staticContext) {
    staticContext.pageNotFound = true;
  }

  return <h1>404 Page not found.</h1>;
};

NotFound.propTypes = {
  staticContext: PropTypes.shape({
    pageNotFound: PropTypes.bool,
  }),
};

NotFound.defaultProps = {
  staticContext: {
    pageNotFound: true,
  },
};

export default NotFound;
