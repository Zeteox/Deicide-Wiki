# Known Errors Manager

## First Error

### Symptom
Login attempt do not redirect on a success page
### Cause
When you try to log in with an invalid fields or password, the server reload the page with the error message but it don't show because it return on the register form and not the login one.

### Solution
click on the "I have an account" button to go to the login form and see the error message.