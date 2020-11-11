const { merge } = require('mochawesome-merge');
const marge = require('mochawesome-report-generator');

const reporterOptions = {
  reportDir: 'cypress/results/mocha',
  quiet: true,
  code: false,
};

merge(reporterOptions).then(report => {
  marge.create(report, reporterOptions);
});
