/**
 * @description Validates user input for name, email, and password.
 * Checks for missing fields and validates email format.
 * @param {string} name - The account name.
 * @param {string} mail - The account email.
 * @param {string} pwd - The account password.
 * @returns errors
 */
export function validationService(name, mail, pwd) {
    const regex = /^.*@[a-zA-Z]+\..+$/;
    const errors = {};

    if (!name || !mail || !pwd) {
        //log
        errors.fields = "Missing required fields";
    }
    if (!regex.test(mail)) {
        //log
        errors.mail = "Format email is invalid";
    }
    return errors;
}
