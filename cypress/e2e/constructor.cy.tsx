describe('Проверка конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  describe('Тестирование добавления ингредиентов', () => {
    it('Должен добавлять булку и начинку в конструктор', () => {
      cy.contains('Добавить').first().click();
      cy.contains('Добавить').last().click();
      cy.get('.constructor-element').should('contain', 'Краторная булка N-200i');
      cy.get('.constructor-element').should('contain', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Тестирование модальных окон ингредиентов', () => {
    it('Должно открываться модальное окно с описанием ингредиента', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('#modals').should('contain', 'Детали ингредиента');
      cy.get('#modals').should('contain', 'Краторная булка N-200i');
      cy.get('#modals').should('contain', 'Калории,ккал');
      cy.get('#modals').should('contain', '420');
    });

    it('Должно закрываться по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('#modals').should('contain', 'Детали ингредиента');
      cy.get('#modals button').click();
      cy.get('#modals').should('be.empty');
    });

    it('Должно закрываться по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('#modals').should('contain', 'Детали ингредиента');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('#modals').should('be.empty');
    });
  });

  describe('Тестирование оформления заказа', () => {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', 'test-refreshToken');
      cy.setCookie('accessToken', 'test-accessToken');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');
    });

    afterEach(() => {
      window.localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('Должен успешно оформлять заказ и очищать конструктор', () => {
      cy.contains('Добавить').first().click();
      cy.contains('Добавить').last().click();
      cy.contains('Оформить заказ').click();
      cy.wait('@postOrder');
      cy.get('#modals').should('contain', '1337');
      cy.get('#modals button').click();
      cy.get('#modals').should('be.empty');
      cy.get('.constructor-element').should('not.exist');
    });
  });
});
