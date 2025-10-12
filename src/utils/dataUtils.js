import fs from "fs";
import bcrypt from "bcrypt";


/**
 * Custom error class for account-related errors.
 * @extends Error
 */
class AccountError extends Error {
    constructor(message, code = 'ACCOUNT_ERROR') {
        super(message);
        this.name = "AccountError";
        this.code = code;
    }
}

/**
 * @description Reads all accounts from the JSON file.
 * @returns {Promise<Array>} - A promise that resolves to an array of account objects.
 * @throws {AccountError} - Throws an AccountError if there is a read error.
 */
async function getAllAccounts() {
    try {
        const data = fs.readFileSync("./data/accounts.json", "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        }
        //log
        throw new AccountError("Server error during account retrieval.", 'READ_ERROR');
    }
}

/**
 * @description Checks if an account with the given name exists.
 * @param {string} name - The name to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the account exists, false otherwise.
 */
export async function isAccountExistingByName(name) {
    const accounts = await getAllAccounts();
    for (const account of accounts) {
        if (account.name === name) return true;
    }
    return false;
}

/**
 * @description Checks if an account with the given email exists.
 * @param {string} mail - The email to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the account exists, false otherwise.
 */
export async function isAccountExistingByMail(mail) {
    const accounts = await getAllAccounts();
    for (const account of accounts) {
        if (account.mail === mail) return true;
    }
    return false;
}

/**
 * @description Saves a new account to the JSON file.
 * Hashes the password before saving.
 * @param {string} name - The account name.
 * @param {string} mail - The account email.
 * @param {string} password - The account password.
 * @returns {Promise<void>} - A promise that resolves when the account is saved.
 * @throws {AccountError} - Throws an AccountError if there is a write error.
 */
export async function saveAccount(name, mail, password) {
    try {
        const accounts = await getAllAccounts();
        const hash = await bcrypt.hash(password, 12);
        accounts.push({name, mail, pwd: hash});
        await fs.writeFileSync("./data/accounts.json", JSON.stringify(accounts), "utf-8");
        //log
    } catch (err) {
        //log
        throw new AccountError("Server error during registration.", 'WRITE_ERROR');
    }
}