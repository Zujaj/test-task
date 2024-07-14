describe('User Fills Up The Form & Gets Registered Successfully', () => {

  // Before each test, visit the homepage
  beforeEach(() => {
    cy.visit('/')
  })

  // Priority 1: Core functionality
  it('should submit the form when user enters valid information', () => {
    cy.getDataCy('nameField').type('Garry Doe')
    cy.getDataCy('emailAddressField').type('garry.doe@yopmail.com')
    cy.getDataCy('passwordField').type('superAwesomeP@ssword')
    cy.getDataCy('confirmPasswordField').type('superAwesomeP@ssword')
    cy.getDataCy('birthDayField').type('1994-05-09')
    cy.getDataCy('genderField').select('Male')
    cy.getDataCy('newsLetterField').check()
    cy.getDataCy('submitButton').click()

    cy.contains('Form submitted successfully!').should('exist')
  })

  it('should not allow form submission when passwords do not match', () => {
    cy.getDataCy('nameField').type('Garry Doe')
    cy.getDataCy('emailAddressField').type('garry.doe@yopmail.com')
    cy.getDataCy('passwordField').type('superAwesomeP@ssword')
    cy.getDataCy('confirmPasswordField').type('differentPassword')
    cy.getDataCy('birthDayField').type('1994-05-09')
    cy.getDataCy('genderField').select('Male')
    cy.getDataCy('newsLetterField').check()
    
    cy.getDataCy('submitButton').click()
    cy.contains('Passwords must match').should('exist')
    cy.expectSuccessToast(false)
  })

  // Priority 2: Important validation checks
  it('should not allow form submission when user leaves fillable fields empty', () => {
    let fillableFields = ['nameField', 'emailAddressField']

    // Attempt to submit with empty required fields
    for (let index = 0; index < fillableFields.length; index++) {
      const field = fillableFields[index];
      cy.getDataCy(field).type('   ') // simulate empty input
    }

    cy.getDataCy('newsLetterField').check();
    cy.getDataCy('submitButton').click()
    cy.expectSuccessToast(false)
  })

  it('should not allow user to enter invalid names & hit the "Submit" button', () => {
    const invalidNames = [
      'John@Doe',     // contains @
      'Anna!Marie',   // contains !
      '⚠️ Smith '     // contains emoji
    ];

    for (let idx = 0; idx < invalidNames.length; idx++) {
      cy.getDataCy('nameField')
        .clear()
        .type(invalidNames[idx]);

      cy.getDataCy('newsLetterField').check();
      cy.getDataCy('submitButton').click();
    }
    cy.expectSuccessToast(false) // Invalid name should fail
  });

  // Priority 3: Edge cases / less likely scenarios
  it("should not allow user to directly hit the 'Submit' button ", () => {
    cy.getDataCy('newsLetterField').should('not.be.checked')
    cy.getDataCy('submitButton').click()
  })

})
