// https://docs.cypress.io/api/introduction/api.html

describe('Test auth', () => {
  it('Visits the login page', () => {
    cy.visit('/login');
    cy.contains('[data-test=header]', 'Авторизация');
  });

  it('Test incorrect login credentials', () => {
    cy.visit('/login');
    cy.get('[data-test=email]').type('incorrect-email');
    cy.get('[data-test=password]').type('incorrect-password');
    cy.get('[data-test=submit]').click();
    cy.contains('[data-test=alert]', 'Пароль неверный');
  });

  it('Test correct login credentials', () => {
    cy.visit('/login');
    cy.get('[data-test=email]').type('moderator@stepik.stepik');
    cy.get('[data-test=password]').type('test123');
    cy.get('[data-test=submit]').click();
    cy.contains('[data-test=header]', 'Работы на проверку');
  });
});
