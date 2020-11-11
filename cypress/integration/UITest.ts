//<reference types="cypress" />
import {KmartObj} from '../support/ObjectRepository/Objects'

describe('KmartUI', () => {
      it('KmartUI', () => {
        cy.visit('https://kmart.com.au/')
        cy.fixture('identitii/testsample.json').then(testdata => {
         
        KmartObj.BookADemoButton().click();
          
        cy.url().should('contain', )
        });
      });
});
    
