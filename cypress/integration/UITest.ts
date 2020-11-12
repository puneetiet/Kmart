// / <reference types="Cypress" />
import { KmartObj } from '../support/ObjectRepository/Objects';

describe('KmartUI', () => {
  it('KmartUI', () => {
    cy.visit('https://kmart.com.au/');
    cy.fixture('Kmart/testsample.json').then((testdata: { pageName: string }) => {
      cy.get('.close-modal-dialog > .icon-cross').click();
      KmartObj.pageObject(testdata.pageName).click();
      cy.screenshot(`${testdata.pageName}`);
    });
  });
});
