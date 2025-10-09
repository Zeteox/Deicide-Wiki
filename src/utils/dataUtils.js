const fs = require("fs");
const bcrypt = require("bcrypt")

function registerUser(req, res, {name, mail, pwd}) {
    bcrypt.hash(pwd, 12, (err, hash) => {
        if (err) {
            res.writeHead(500)
            res.end(err.message)
        }
        fs.readFile("./data/accounts.json", "utf-8", (err, data) => {
            let accounts = [];
            if (!err && data) {
                accounts = JSON.parse(data);
                for (let account of accounts) {
                    if (account.mail === mail) {
                        res.writeHead(409)
                        res.end("Email already in use.")
                        return;
                    }
                    if (account.name === name) {
                        res.writeHead(409)
                        res.end("Username already in use.")
                        return;
                    }
                }
            }
            try {
                accounts.push({name, mail, pwd: hash});
                fs.writeFile("./data/accounts.json", JSON.stringify(accounts), "utf-8", () => {
                    res.writeHead(201)
                    res.end("Account created successfully.")
                })
            } catch (err) {
                res.writeHead(500)
                res.end(err.message)
            }
        })
    })
}

module.exports = {registerUser};