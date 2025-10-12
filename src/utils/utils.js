import fs from "fs";

/**
 * @description Renders the sign-in/sign-up page with dynamic error messages and pre-filled values.
 * @param {Object} res - Express response object.
 * @param {Object} error - Object containing error messages for 'name' and 'mail' fields (default is an empty object).
 * @param {string} name - Name to pre-fill in the form (default is an empty string).
 * @param {string} mail - Email to pre-fill in the form (default is an empty string).
 * @param {number} status - HTTP status code to send with the response (default is 200).
 */
export function renderSignPage(res, {error = {}, name = '', mail = ''} = {}, status = 200) {
    fs.readFile("./public/templates/sign.html", "utf-8", (err, data) => {
        if (err) return res.status(404).send("File Not Found");
        data = data
            .replace('value="__SIGNUP_NAME__"', `value="${name}"`)
            .replace('value="__SIGNUP_MAIL__"', `value="${mail}"`)
            .replace('__SIGNUP_NAME_ERROR__', error.name ? error.name : '')
            .replace('__SIGNUP_MAIL_ERROR__', error.mail ? error.mail : '')
            .replace('value="__LOGIN_NAME__"', `value="${name}"`)
            .replace('value="__LOGIN_MAIL__"', `value="${mail}"`)
            .replace('__LOGIN_NAME_ERROR__', error.name ? error.name : '')
            .replace('__LOGIN_MAIL_ERROR__', error.mail ? error.mail : '');
        res.status(status).type("html").send(data);
    });
}