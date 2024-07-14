/// <reference types="cypress" />

Cypress.Commands.add('getDataCy', (selector: string) => {
    cy.get(`[data-cy="${selector}"]`)
})

Cypress.Commands.add('expectSuccessToast', (isSuccessCase: boolean) => {
    if (isSuccessCase) {
        cy.contains('Form submitted successfully!').should('exist')
    } else {
        cy.contains('Please fix the errors in the form!').should('exist')
    }
})

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Fetches UI components with `data-cy` attribute.
             *
             * @param selector - ID of the input field or button
             * @see {@link https://docs.cypress.io/guides/references/best-practices#Selecting-Elements | Cypress Best Practices For Selecting Elements}
             * @example
             *```ts
             * // Yields cy.get('[data-cy="password-field"]')
             * cy.getDataCy('password-field')
             *```
             */
            getDataCy(selector: string): Chainable<void>

            /**
             * Handles a success or error toast notification based on the form submission result.
             *
             * @param isSuccessCase - A boolean indicating if the form submission was successful (true) or failed (false).
             * @example
             * ```ts
             * // Shows a success toast
             * expectSuccessToast(true)
             * 
             * // Shows an error toast
             * expectSuccessToast(false)
             * ```
             */
            expectSuccessToast(isSuccessCase: boolean): Chainable<void>
        }
    }
}

export { }
