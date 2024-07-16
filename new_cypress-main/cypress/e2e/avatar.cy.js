describe('Покупка нового аватара', function () {

    it('Критический путь за пользователя по покупке аватара', function () {
         cy.visit('https://pokemonbattle.ru/login'); // Зашла на сайт
         cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // Ввожу верный логин
         cy.get('#password').type('USER_PASSWORD'); // Ввожу верный пароль
         cy.get('.auth__button').click(); // Нажимаю кнопку Войти
         cy.get('.header__btns > :nth-child(4)').click(); // Нажимаю на кнопку Магазин
         cy.get('.available > button').first().click(); // кликаем по кнопке Купить у первого доступного аватара
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111 1111 1111 1111'); // Ввожу номер карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('12/24'); // Ввожу срок действия карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Ввожу cvc код
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('OLGA ISAEVA'); // Ввожу имя
         cy.get('.pay-btn').click(); // Нажимаю Оплатить
         cy.get('#cardnumber').type('56456'); // Ввожу код подтверждения
         cy.get('.payment__submit-button').click(); // Нажимаю Отправить
         cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // Проверяю на совпадение текст
         cy.get('.payment__font-for-success').should('be.visible'); // Текст виден пользователю

     })

 })