// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// import 'cypress-ntlm-auth/dist/commands';

// const login = () => {
//   cy.ntlmReset();
//   cy.ntlm(Cypress.env('adfsEndpoint'), Cypress.env('username'), Cypress.env('password'), Cypress.env('domain'));
//   cy.wait(1000);

//   try {
//     cy.log('Authenticating?');
//     cy.request({ url: 'https://lending-portal-sit.bbldtl.int/', retryOnStatusCodeFailure: true }).then(response => {
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(response.body, 'text/xml');

//       const submitURL = xmlDoc.getElementsByName('hiddenform')[0].getAttribute('action');
//       const SAMLResponse = xmlDoc.getElementsByName('SAMLResponse')[0].getAttribute('value');
//       const RelayState = xmlDoc.getElementsByName('RelayState')[0].getAttribute('value');

//       const postOptions = {
//         method: 'POST',
//         url: submitURL,
//         form: true,
//         body: {
//           SAMLResponse,
//           RelayState,
//         },
//       };
//       cy.request(postOptions);
//     });
//   } catch (error) {
//     cy.log('Error Authenticating!', error);
//   }
// };
// Cypress.Commands.add('login', login);
import addContext from 'mochawesome/addContext';
// import glob from 'glob';

export function addTestContext(title: string, value: any) {
  // https://on.cypress.io/catalog-of-events#App-Events
  cy.once('test:after:run', test => {
    addContext({ test }, { title, value });
  });
}

// Cypress.on('test:after:run', test => {
//   console.log('The test is', test);
//   // if (test.state === 'passed') {
//   const screenshotFileName = `Lending Report.png`;
//   // addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`);
//   // }

//   cy.task('testContext').then(testContextValue => {
//     addContext(
//       { test },
//       {
//         title: 'extra',
//         value: {
//           // screenshot: `assets/${Cypress.spec.name}/${screenshotFileName}`,
//           extraString: 'timbo slice',
//           ...testContextValue,
//         },
//       }
//     );
//   });

//   // addContext({ test }, JSON.stringify(test));

//   // glob(`assets/${Cypress.spec.name}/${screenshotFileName}/*.png`, (err, files) => {
//   // glob(`assets/${Cypress.spec.name}/*.png`, (err, files) => {
//   //   cy.log('Found ', files, 'at', `assets/${Cypress.spec.name}/*.png`);
//   //   files.forEach(filePath => addContext({ test }, filePath));
//   // });
//   // }
// });
