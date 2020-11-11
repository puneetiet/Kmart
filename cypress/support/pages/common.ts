import { addTestContext } from '../commands';

/*
  Click on an element containing text within the given selector.
  By limiting the scope, it makes the easy 'contains' call simple to use.
*/
const day = Cypress.moment().day;
const month = Cypress.moment().month;
const year = Cypress.moment().year;
const hour = Cypress.moment().hour;
const minute = Cypress.moment().minute;
const second = Cypress.moment().second;

const now = `${year}_${month}_${day}_${hour}_${minute}_${second}`;

export const clickWithinwithText = (selector: string) => (text: string) => {
  cy.get(selector).within(() => cy.contains(text).click());
};

export const clickWithinwithSelector = (selector: string) => (selector2: string) => {
  cy.get(selector).within(() => cy.get(selector2).click());
};

export const assertDateDisplay = (selector: string) => (
  selector2: string,
  propertyname: any,
  day1: string,
  month1: string,
  year1: string
) => {
  cy.get(selector).within(() => cy.get(selector2).should('have.attr', propertyname, `${day1}/${month1}/${year1}`));
};

export function captureInnerText(filepath: string, index: number, selector: string, scenario: number) {
  cy.get(selector).then($el => {
    // eslint-disable-next-line cypress/no-assigning-return-values
    cy.get('div.css-p7yfdk')
      .find('label.css-370cjg')
      .then($el2 => {
        expect($el2).contain('Current Status');
      })
      .next()
      .then($el3 => {
        cy.writeFile(filepath, ',', { flag: 'a+' });
        cy.writeFile(
          filepath,
          { scenario, lendingfileid: $el.get(index).innerText, status: $el3.text().trim() },
          { flag: 'a+' }
        );
      });
  });
}

export const assertFailure = (selector: string) => (selector2: string, propertyname: any, propertyvalue: any) => {
  cy.get(selector)
    .children(selector2)
    .should('not.exist')
    .should('not.have.attr', propertyname, propertyvalue);
};

export const assertSuccess = (selector: string) => (selector2: string, propertyname: any, propertyvalue: any) => {
  cy.get(selector)
    .children(selector2)
    .should('exist')
    .should('have.attr', propertyname, propertyvalue);
};
/* export const clickExactWithin = (selector: string) => (text: string) => {
  cy.get(selector).within(() => cy.getByText(text).click());
}; */

export const typeIn = (selector: string, innerSelector: string) => (value: string) => {
  cy.get(selector).within(() => cy.get(innerSelector).type(value));
};

export const containsWithin = (selector: string) => (text: string) => {
  cy.get(selector)
    .should('be.visible')
    .within(() => cy.contains(text));
};

export const selectWithin = (selector: string) => (text: string) => {
  cy.get(selector)
    .eq(0)
    .should('be.visible')
    .within(() => cy.get('select').select(text));
};

export const slideToWithin = (selector: string) => (value: string) => {
  const sliderSelector = '.rz-pointer.wdg-pointer-low';
  const sliderValue = 'aria-valuetext';
  const sliderminValue = 'aria-valuemin';
  const slidermaxValue = 'aria-valuemax';
  const sliderpointvalue = 'aria-valuenow';
  const rightArrow = '{rightarrow}';
  const leftArrow = '{leftarrow}';

  return cy.get(selector).within(() => {
    // Recursively check and move until we get our value or run out of retries
    const checkSliderValue = (slider: Cypress.ObjectLike): Cypress.Chainable<any> | undefined => {
      const pointvalue = Number(slider.attr(sliderpointvalue));
      const minValue = Number(slider.attr(sliderminValue));
      const maxValue = Number(slider.attr(slidermaxValue));
      const current = Number(slider.attr(sliderValue).replace(/\D/g, ''));
      const value1 = Number(value.replace(/\D/g, ''));

      if (value1 < current && pointvalue > minValue) {
        cy.get(sliderSelector).type(leftArrow);
        return cy.get(sliderSelector).then(checkSliderValue);
      }
      if (value1 > current && pointvalue < maxValue) {
        cy.get(sliderSelector).type(rightArrow);
        return cy.get(sliderSelector).then(checkSliderValue);
      }

      return undefined;
    };
    return cy.get(sliderSelector).then(checkSliderValue);
  });
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const containWithinSibling = (selector: string) => (text: string, value: string) => {
  cy.get(selector)
    .should('be.visible')
    .within(() =>
      cy
        .contains(text)
        .next()
        .then($el => expect($el).to.contain(value))
    );
};

export const generatePostalCode = (min: number, max: number) => {
  const postalCode = Math.floor(Math.random() * (max - min) + min);
  return String(postalCode);
};

export const validateNull = (variable: any) => {
  // eslint-disable-next-line prettier/prettier
  if (variable === '' || variable === '-' || variable === 0 || variable === 0.0 || variable === 0.0) {
    cy.log(`${variable}has value null`);
    return false;
  }
  return true;
};

export const withinRangeOfSibling = (selector: string) => (text: string, start: number, finish: number) => {
  cy.get(selector)
    .should('be.visible')
    .within(() =>
      cy
        .contains(text)
        .next()
        .invoke('text')
        .then(innerText => {
          const numberText = JSON.stringify(innerText).replace(/[^-?(0-9).]+/g, '');
          expect(Number(numberText)).to.be.within(start, finish);
          // TODO: Instead of failing straight away:
          // If the number is exact match, pass
          // If the number is within range, add context indicating that.
          // If the number is outside of the range, fail.
        })
    );
};

export function textOfSiblingwithText(selector: string) {
  return cy
    .contains(selector)
    .next()
    .invoke('text')
    .then(innerText => {
      const numberText = JSON.stringify(innerText).replace(/[^-?(0-9).]+/g, '');
      // expect(Number(numberText)).to.be.within(start, finish);
      // Cypress.env(`siblingText_${now}`, numberText);
      return numberText;
    });
  // return Cypress.env(`siblingText_${now}`);
}

export function textContent(selector: string) {
  cy.get(selector)
    .invoke('text')
    .then(innerText => {
      const numberText = JSON.stringify(innerText).replace(/[^-?(0-9).]+/g, '');
      // expect(Number(numberText)).to.be.within(start, finish);
      Cypress.env(`textContent_${now}`, numberText);
      return numberText;
    });
}

export function validatySuccess(success: boolean, failure: boolean, approx: boolean) {
  if (success === true && failure === false && approx === false) {
    const statement = 'Lending UI Screen Assessment Results';
    cy.screenshot(statement);
    addTestContext(`${statement} Screenshot`, `assets/${Cypress.spec.name}/${statement}.png`);
  }
}

export function roundToTwo(num: number) {
  return +`${Math.round(`${num}e+2`)}e-2`;
}
