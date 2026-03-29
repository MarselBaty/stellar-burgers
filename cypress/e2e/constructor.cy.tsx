const SELECTOR_MODALS = '#modals';
const SELECTOR_MODALS_BUTTON = '#modals button';
const SELECTOR_CONSTRUCTOR = '.constructor-element';
const SELECTOR_OVERLAY = '[data-cy="modal-overlay"]';

const TEXT_BUN = 'Краторная булка N-200i';
const TEXT_MAIN = 'Биокотлета из марсианской Магнолии';
const TEXT_DETAILS = 'Детали ингредиента';
const TEXT_ORDER = 'Оформить заказ';

describe('Проверка конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
  });

  describe('Тестирование добавления ингредиентов', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Должен добавлять булку и начинку в конструктор', () => {
      cy.contains('li', TEXT_BUN).contains('Добавить').click();
      cy.contains('li', TEXT_MAIN).contains('Добавить').click();

      cy.get(SELECTOR_CONSTRUCTOR).should('contain', TEXT_BUN);
      cy.get(SELECTOR_CONSTRUCTOR).should('contain', TEXT_MAIN);
    });
  });

  describe('Тестирование модальных окон ингредиентов', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Должно открываться модальное окно с описанием ингредиента', () => {
      cy.contains(TEXT_BUN).click();
      cy.get(SELECTOR_MODALS).should('contain', TEXT_DETAILS);
      cy.get(SELECTOR_MODALS).should('contain', TEXT_BUN);
      cy.get(SELECTOR_MODALS).should('contain', 'Калории, ккал');
      cy.get(SELECTOR_MODALS).should('contain', '420');
    });

    it('Должно закрываться по клику на крестик', () => {
      cy.contains(TEXT_BUN).click();
      cy.get(SELECTOR_MODALS).should('contain', TEXT_DETAILS);
      cy.get(SELECTOR_MODALS_BUTTON).click();
      cy.get(SELECTOR_MODALS).should('be.empty');
    });

    it('Должно закрываться по клику на оверлей', () => {
      cy.contains(TEXT_BUN).click();
      cy.get(SELECTOR_MODALS).should('contain', TEXT_DETAILS);
      cy.get(SELECTOR_OVERLAY).click({ force: true });
      cy.get(SELECTOR_MODALS).should('be.empty');
    });
  });

  describe('Тестирование оформления заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'postOrder'
      );

      // Устанавливаем токены перед открытием приложения
      window.localStorage.setItem('refreshToken', 'test-refreshToken');
      cy.setCookie('accessToken', 'test-accessToken');

      cy.visit('/');
    });

    afterEach(() => {
      window.localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('Должен успешно оформлять заказ и очищать конструктор', () => {
      cy.contains('li', TEXT_BUN).contains('Добавить').click();
      cy.contains('li', TEXT_MAIN).contains('Добавить').click();

      cy.contains(TEXT_ORDER).click();
      cy.wait('@postOrder');

      cy.get(SELECTOR_MODALS).should('contain', '1337');
      cy.get(SELECTOR_MODALS_BUTTON).click();
      cy.get(SELECTOR_MODALS).should('be.empty');

      cy.get(SELECTOR_CONSTRUCTOR).should('not.exist');
    });
  });
});
