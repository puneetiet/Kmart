//<reference types="cypress" />
import {BookADemoObj} from '../support/ObjectRepository/Objects'

describe('BookaDemo', () => {
      it('BookaDemo', () => {
        cy.visit('https://identitii.com/')
        cy.fixture('identitii/testsample.json').then(testdata => {
         
        BookADemoObj.BookADemoButton().click();
          
        cy.url().should('contain', )
        });
      });
});
    
