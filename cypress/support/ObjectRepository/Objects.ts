export const KmartObj = {
  pageObject(pageName: string) {
    return cy.get('.has-submenu.level1').children(`a:contains('${pageName}')`);
  },
};


