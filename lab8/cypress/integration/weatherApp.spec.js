 describe('WeatherApp - Пошук погоди', () => {
    it('Перевірка пошуку міста', () => {
      cy.visit('/');
      cy.get('.search-bar input').type('Kyiv');
      cy.get('.search-bar button').click();
      cy.get('.weather-card').should('contain', 'Kyiv');
    });
  });
  