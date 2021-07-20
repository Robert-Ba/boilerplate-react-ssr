const LOCALHOST = 'http://localhost:3002';
const TEST_DOMAIN = 'https://foobar.herokuapp.com';
const PROD_DOMAIN = 'https://www.foobar.com';

const envUrl = (env) => {
  switch (env) {
    case 'prod':
      return PROD_DOMAIN;
    case 'test':
      return TEST_DOMAIN;
    default: return LOCALHOST;
  }
};

module.exports = {
  env: process.env.ENV,
  siteURL: envUrl(this.env),
};
