/// <reference types="cypress" />

import { login, assertFailedLogin, assertSuccessfulLogin, assertLoggedOut } from './utils.js'

describe('Login Component', () => {

    const validUsername = 'tomsmith';
    const validPassword = 'SuperSecretPassword!';

    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/login')
    });

    context('Successful Login', () => {

        it('Correct username and password results in success', () => {
            login(validUsername, validPassword);
            assertSuccessfulLogin();
        });

        it('Logout takes you back to login page', () => {
            login(validUsername, validPassword);
            assertSuccessfulLogin();

            cy.contains('Logout').click();
            assertLoggedOut();
        });

    });

    context('Unsuccessful Login', () => {

        it('Empty username results in failure', () => {
            login('', validPassword);
            assertFailedLogin('username');
        });

        it('Empty password results in failure', () => {
            login(validUsername, '');
            assertFailedLogin('password');
        });

        it('Empty username & password results in failure', () => {
            login('', '');
            assertFailedLogin('username');
        });

        it('Incorrect casing results in failure', () => {
            login(validUsername, validPassword.toLowerCase());
            assertFailedLogin('password');
        });

    });


});
