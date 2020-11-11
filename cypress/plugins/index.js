/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('@cypress/webpack-preprocessor');
// const ntlmAuth = require('cypress-ntlm-auth/dist/plugin');
const webpackOptions = require('../webpack.config.js');

module.exports = (on, config) => {
  const options = {
    webpackOptions,
  };
  on('file:preprocessor', webpack(options));
  // return ntlmAuth.initNtlmAuth(config);
  // return config;
};
