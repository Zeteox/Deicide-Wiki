const express = require('express');
const fs = require("fs");
const { logUser } = require('../utils/dataUtils');
const router = express.Router();

router.get("/", (req, res) => {
    fs.readFile("./public/templates/index.html","utf-8",(err, data) => {
        if (err) {
            res.writeHead(404)
            res.write("File Not Found")
        } else {
            res.writeHead(200, {
                "content-type":"text/html;charset=utf-8"
            })
            res.write(data)
        }
        res.end()
    })
})

router.post("/login", (req, res) => {
    const regex = /^.*@[a-zA-Z]+\..+$/;
    let {name, mail, pwd} = req.body;

    if (!name || !mail || !pwd) {
        res.writeHead(400, "Missing required fields")
        res.end()
        return
    }
    if (!regex.test(mail)) {
        res.writeHead(400, "Format email is invalid")
        res.end()
        return
    } else {
        logUser(req, res, {name, mail, pwd})
    }
})

module.exports = router;