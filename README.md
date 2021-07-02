# Backbase Task
Test cases and Cypress automation

## Manual test cases
For the manual test cases I tried to capture any possible action a user could take in regards to the computer database, some that are very important to the running of the database and some features that you'd expect to work away from the CRUD features. 

Tests 1-6 I feel are the core CRUD related tasks a user would perform, and tests 7-10 are tests that while they don't actually impact the CRUD features, they are still important to the running of the application. 

## Cypress automation regression tests
I felt that all ten of the test cases that I made would qualify for regression testing as if I was an end user of the application all things tested would contribute to my user experience

For test case three - 'Attempt to create a new computer with no data' I decided to check both the frontend for an error and show that I can also work from a network request automation side. 

I was unable to automate sorting in test case seven - 'Sort computers by columns' as I'm not sure there is a straight forward way to automate whether something is sorted either alphabetically or numerically/by date using Cypress at the moment, or if there is I am unaware of how to do it at this time. 

Finally I was unable to automate the testing of the clear button in the search bar in test case ten - 'Check that clear and Cancel buttons work as expected'. I have had issues with this in the past where a clear button appears but when trying to inspect its page element I'm unable to find it, but I cannot find how I solved this problem previously I'm afraid. 
