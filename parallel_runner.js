const ls = require('ls');
const cypress = require('cypress');
const yargs = require('yargs');
const rm = require('rimraf');
const glob = require('glob');
const pLimit = require('p-limit');
const cypressConfig = require('./cypress');

const argv = yargs
  .options({
    browser: {
      alias: 'b',
      describe: 'choose browser that you wanna run tests on',
      default: 'electron',
      choices: ['chrome', 'electron'],
    },
    spec: {
      alias: 's',
      describe: 'run test with specific spec file',
      default: 'cypress/integration/*.ts',
    },
    limit: {
      alias: 'l',
      describe: 'set the limit of how many tests to run in paralell',
      default: 4,
    },
  })
  .help().argv;

const limit = pLimit(argv.limit);
const reportDir = cypressConfig.reporterOptions.reportDir;
const reportFiles = `${reportDir}/*.json`;
// list all of existing report files
// ls(reportFiles, { recurse: true }, file => console.log(`removing ${file.full}`));

// delete all existing report files
// rm(reportFiles, error => {
//   if (error) {
//     console.error(`Error while removing existing report files: ${error}`);
//     process.exit(1);
//   }
//   console.log('Removing all existing report files successfully!');
// });

const runTest = spec =>
  cypress
    .run({
      browser: argv.browser,
      spec,
    })
    .then(results => {
      // console.log('Finished', spec, results);
    })
    .catch(error => {
      console.error('errors: ', error);
      process.exit(1);
    });

(async () => {
  glob('cypress/integration/*.ts', async (er, files) => {
    console.log(`Running ${files.length} test cases, ${argv.limit} at a time.`);
    const input = files.map(file => limit(() => runTest(file)));
    // Only one promise is run at once
    const result = await Promise.all(input);
  });
})();
