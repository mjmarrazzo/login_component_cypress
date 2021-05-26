export const login = (username, password) => {
    if (username != '') cy.get('#username').type(username);
    if (password != '') cy.get('#password').type(password);
    cy.get('#login').submit();
}

export const assertSuccessfulLogin =
    () => _genericAssert('/secure', 'You logged into a secure area!');

export const assertFailedLogin =
    (type) => _genericAssert('/login', `Your ${type} is invalid!`);

export const assertLoggedOut =
    () => _genericAssert('/login', 'You logged out of the secure area!');

const _genericAssert = (urlSuffix, message) => {
    cy.url()
        .should('contain', urlSuffix);
    cy.get('#flash')
        .should('contain', message);
}