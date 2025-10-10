const fs = require("fs")
const bcrypt = require("bcrypt");
const { console } = require("inspector");

function logUser(req,res, {name, mail, pwd}) {
    fs.readFile("./data/accounts.json","utf-8",(err, data) => {
        if (err) {
            res.writeHead(500)
            res.write("Internal server error, no json file found")
        } else {
            let accounts = JSON.parse(data)["accounts"]
            for (x in accounts) {
                if (name == accounts[x].name
                    && mail == accounts[x].mail
                    && bcrypt.compareSync(pwd, accounts[x].pwd)) {
                    res.writeHead(200)
                    res.write(`Logged in as ${req.body.name}`)
                    res.end()
                    return
                }
            }
            res.writeHead(404)
            res.write("Invalid Account")
            res.end()
        }
    })
}

module.exports = {logUser}