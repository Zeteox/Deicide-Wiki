const {renderSignPage} = require("../utils/utils");
const {validationService} = require("../services/validationService");
const {isAccountExistingByName, isAccountExistingByMail, saveAccount} = require("../utils/dataUtils");
const express = require('express');
const fs = require("fs");
const { logUser } = require('../utils/dataUtils');
const router = express.Router();

router.get("/", (req, res) => {
    renderSignPage(res);
});


router.post("/register", async (req, res) => {
    try {
        let {name, mail, pwd} = req.body || {};
        const error = {};

        const validation = validationService(name, mail, pwd);
        if (validation.fields || validation.mail) {
            return renderSignPage(res, {error: validation, name, mail}, 400);
        }

        if (await isAccountExistingByName(name)) {
            error.name = "This name is already use.";
            //log
        }

        if (await isAccountExistingByMail(mail)) {
            error.mail = "This mail is already use.";
            //log
        }

        if (error.mail || error.name) {
            //log
            return renderSignPage(res, {error, name, mail}, 400);
        }

        await saveAccount(name, mail, pwd);
        return res.status(201).redirect(`/`);
    } catch (err) {
        //log
        const error = {write: "Server error during registration."};
        return renderSignPage(res, {error, name: req.body.name, mail: req.body.mail}, 500);
    }
});

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