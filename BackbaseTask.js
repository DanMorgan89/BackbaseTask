describe('Automation of manual test cases', function() {

    beforeEach(function() {
        cy.visit('http://computer-database.herokuapp.com/computers')
    })

    it('Test Case #1 - Create a new computer with all data present', function() {

        cy.get('[id="add"]').click() //Clicks the add a computer button
        cy.get('[id="name"]').type('DanMorganPC') //Enter computer name
        cy.get('[id="introduced"]').type('2010-12-25') //Enter introduced date
        cy.get('[id="discontinued"]').type('2019-01-01') //Enter discontinued date
        cy.get('[id="company"]').select('Sony') //Selects Sony from the drop down list of companies
        cy.get('[class="btn primary"]').contains('Create this computer').click() //Clicks create this computer

    })

    it('Test Case #2 - Create a new computer with only required data present', function() {

        cy.get('[id="add"]').click() //Clicks the add a computer button
        cy.get('[id="name"]').type('SampleComputer') //Enter computer name
        cy.get('[class="btn primary"]').contains('Create this computer').click() //Clicks create this computer

    })

    it('Test Case #3 - Attempt to create a new computer with no data', function() {

        cy.get('[id="add"]').click() //Clicks the add a computer button
        cy.get('[class="btn primary"]').contains('Create this computer').click() //Clicks create this computer
        cy.get('[class="clearfix error"]').should('be.visible') //Checks that the error banner appears
        
        cy.request({
            method: 'POST',
            url: 'http://computer-database.herokuapp.com/computers',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400) //This sends the request directly and tells cypress if the code returned is a 400 Bad Request
        })
    })

    it('Test Case #4 - Search for specific computers in the database', function() {

        cy.get('[id="searchbox"]').type('DanMorganPC') //Types DanMorganPC into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="computers zebra-striped"]').should('contain', 'DanMorganPC') //Checks that DanMorganPC has been found in the results of the search
        cy.get('[id="searchbox"]').clear() //Clears search bar
        cy.get('[id="searchbox"]').type('Sample') //Types into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="computers zebra-striped"]').should('contain', 'Sample') //Checks that Sample has been found in the results of the search
    
    })

    it('Test Case #5 - Update a computers details', function() {

        //Change computer name
        cy.get('[id="searchbox"]').type('DanMorganPC') //Types DanMorganPC into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="computers zebra-striped"]').contains('DanMorganPC').click() //Selects DanMorganPC
        cy.get('[id="name"]').clear() //Clears name field
        cy.get('[id="name"]').type('DanMorganOtherPC') //Enter computer name
        cy.get('[class="btn primary"]').contains('Save this computer').click() //Clicks save this computer
        cy.get('[id="searchbox"]').type('DanMorganOtherPC') //Types into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="computers zebra-striped"]').should('contain', 'DanMorganOtherPC') //Checks that the change has been found in the results of the search

        //Change Introduced date
        cy.get('[class="computers zebra-striped"]').contains('DanMorganOtherPC').click() //Selects DanMorganPC
        cy.get('[id="introduced"]').clear() //Clears name field
        cy.get('[id="introduced"]').type('2001-05-02') //Enter date
        cy.get('[class="btn primary"]').contains('Save this computer').click() //Clicks save this computer
        cy.get('[id="searchbox"]').type('DanMorganOtherPC') //Types into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="computers zebra-striped"]').should('contain', '02 May 2001') //Checks that the change has been found in the results of the search

        //Change Discontinued date
        cy.get('[class="computers zebra-striped"]').contains('DanMorganOtherPC').click() //Selects DanMorganPC
        cy.get('[id="discontinued"]').clear() //Clears name field
        cy.get('[id="discontinued"]').type('2005-08-12') //Enter date
        cy.get('[class="btn primary"]').contains('Save this computer').click() //Clicks save this computer
        cy.get('[id="searchbox"]').type('DanMorganOtherPC') //Types into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="computers zebra-striped"]').should('contain', '12 Aug 2005') //Checks that the change has been found in the results of the search

        //Change Discontinued date
        cy.get('[class="computers zebra-striped"]').contains('DanMorganOtherPC').click() //Selects DanMorganPC
        cy.get('[id="company"]').select('Apple Inc.') //Selects Apple inc from the drop down list of companies
        cy.get('[class="btn primary"]').contains('Save this computer').click() //Clicks save this computer
        cy.get('[id="searchbox"]').type('DanMorganOtherPC') //Types into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="computers zebra-striped"]').should('contain', 'Apple Inc.') //Checks that the change has been found in the results of the search
    
    })

    it('Test Case #6 - Delete a computer', function() {

        cy.get('[id="searchbox"]').type('SampleComputer') //Types SampleComputer into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="computers zebra-striped"]').contains('SampleComputer').click() //Clicks into SampleComputer
        cy.get('[class="btn danger"]').contains('Delete this computer').click() //Clicks delete computer
        cy.get('[id="searchbox"]').type('SampleComputer') //Types into search bar
        cy.get('[id="searchsubmit"]').click() //Clicks Filter by name button
        cy.get('[class="well"]').should('contain', 'Nothing to display') //Checks that SampleComputer has not been found in the results of the search

    })

    it('Test Case #8 - Clicking through pagination of the computers in the database', function() {

        cy.get('[class="current"]').should('contain', 'Displaying 1 to 10') //Checks that pagination is on the first page
        cy.get('ul').contains('Next').click() //Clicks next
        cy.get('[class="current"]').should('contain', 'Displaying 11 to 20') //Checks that pagination is on the second page
        cy.get('ul').contains('Next').click() //Clicks next
        cy.get('[class="current"]').should('contain', 'Displaying 21 to 30') //Checks that pagination is on the third page
        cy.get('ul').contains('Next').click() //Clicks next
        cy.get('[class="current"]').should('contain', 'Displaying 31 to 40') //Checks that pagination is on the fourth page
        cy.get('ul').contains('Previous').click() //Clicks next
        cy.get('[class="current"]').should('contain', 'Displaying 21 to 30') //Checks that pagination is on the third page
        cy.get('ul').contains('Previous').click() //Clicks next
        cy.get('[class="current"]').should('contain', 'Displaying 11 to 20') //Checks that pagination is on the second page
        cy.get('ul').contains('Previous').click() //Clicks next
        cy.get('[class="current"]').should('contain', 'Displaying 1 to 10') //Checks that pagination is on the first page

    })

    it('Test Case #9 - Checking date formats are restricted to stated format (yyyy-mm-dd)', function() {

        //Incorrect formatted dates
        cy.get('[id="add"]').click() //Clicks the add a computer button
        cy.get('[id="name"]').type('DanMorganPC2') //Enter computer name
        cy.get('[id="introduced"]').type('02-05-1990') //Enter incorrectly formatted introduced date
        cy.get('[class="btn primary"]').contains('Create this computer').click() //Clicks create this computer
        cy.get('[class="clearfix error"]').should('be.visible') //Checks that the error banner appears
        cy.get('[id="introduced"]').clear() //Clears the field
        cy.get('[id="discontinued"]').type('08-26-1989') //Enter incorrectly formatted discontinued date
        cy.get('[class="btn primary"]').contains('Create this computer').click() //Clicks create this computer
        cy.get('[class="clearfix error"]').should('be.visible') //Checks that the error banner appears
        cy.get('[id="discontinued"]').clear() //Clears the field

        //False dates
        cy.get('[id="introduced"]').type('1999-06-31') //Enter a false date
        cy.get('[class="btn primary"]').contains('Create this computer').click() //Clicks create this computer
        cy.get('[class="clearfix error"]').should('be.visible') //Checks that the error banner appears
        cy.get('[id="introduced"]').clear() //Clears the field
        cy.get('[id="discontinued"]').type('2006-02-30') //Enter incorrectly formatted discontinued date
        cy.get('[class="btn primary"]').contains('Create this computer').click() //Clicks create this computer
        cy.get('[class="clearfix error"]').should('be.visible') //Checks that the error banner appears
        cy.get('[id="discontinued"]').clear() //Clears the field
        cy.get('[id="introduced"]').type('1999-13-01') //Enter a false date
        cy.get('[class="btn primary"]').contains('Create this computer').click() //Clicks create this computer
        cy.get('[class="clearfix error"]').should('be.visible') //Checks that the error banner appears

    })

    it('Test Case #10 - Check that Cancel button works as expected', function() {

        cy.get('[id="add"]').click() //Clicks the add a computer button
        cy.get('[class="btn"]').click() //Clicks the Cancel button
        cy.get('[class="computers zebra-striped"]').should('be.visible') //Checks that the Cancel button returns user to the table of computers

    })
})