import * as data from "../helpers/default_data.json"

import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('https://login.qa.studio/');  // Зашла на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверяю цвет кнопки восст. пароля
     });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
     });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); // Ввела верный логин
         cy.get(main_page.password).type(data.password); // Ввела верный пароль
         cy.get(main_page.login_button).click(); // Нажала войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

     it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажимаю восстановить пароль
        cy.get(recovery_password_page.email).type('german@dolnikov.ru'); // Ввела почту для восстановления пароля
        cy.get(recovery_password_page.send_button).click(); // Нажала отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввела верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // Ввела неверный пароль
        cy.get(main_page.login_button).click(); // Нажала войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolnikovv.ru'); // Ввела неверный логин
        cy.get(main_page.password).type(data.password); // Ввела верный пароль
        cy.get(main_page.login_button).click(); // Нажала войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

    it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввела логин без @
        cy.get(main_page.password).type(data.password); // Ввела верный пароль
        cy.get(main_page.login_button).click(); // Нажала войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввела верный логин, но с заглавными буквами
        cy.get(main_page.password).type(data.password); // Ввела верный пароль
        cy.get(main_page.login_button).click(); // Нажала войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

 })