const fs = require("fs")
const bcrypt = require("bcrypt");

function logUser(req,res, {name, mail, pwd}) {
    fs.readFile("./data/accounts.json","utf-8",(err, data) => {
        if (err) {
            res.writeHead(500).end("Internal server error")
            req.log.error({ error: err.message }, "Unable to read accounts.json")
            return
        } else {
            let accounts = JSON.parse(data)
            for (x in accounts) {
                if (name == accounts[x].name && mail == accounts[x].mail) {
                    if (bcrypt.compareSync(pwd, accounts[x].pwd)) {
                        res.writeHead(200).end(`Logged in as ${req.body.name}`)
                        req.log.info({ user: name , mail }, "User logged in")
                        return
                    }
                    res.writeHead(401).end("Invalid password")
                    req.log.warn({ user: name , mail }, "Invalid password attempt")
                    return
                }
            }
            res.writeHead(404).end("Account not found")
            req.log.warn({ user: name , mail }, "Account not found")
        }
    })
}

module.exports = {logUser}