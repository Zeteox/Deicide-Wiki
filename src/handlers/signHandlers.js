const {renderSignPage} = require("../utils/utils");
const {validationService} = require("../services/validationService");
const {isAccountExistingByName, isAccountExistingByMail, saveAccount} = require("../utils/dataUtils");
const express = require('express');
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
        return res.status(201).redirect(`/results?type=register`);
    } catch (err) {
        //log
        const error = {write: "Server error during registration."};
        return renderSignPage(res, {error, name: req.body.name, mail: req.body.mail}, 500);
    }
});

router.post("/login", async (req, res) => {
    try {
        let {name, mail, pwd} = req.body || {};
        let error = {};

        const validation = validationService(name, mail, pwd);
        if (validation.fields || validation.mail) {
            return renderSignPage(res, {error: validation, name, mail}, 400);
        }

        if (!(await isAccountExistingByName(name))) {
            error.name = "No existing account with this name.";
            req.log.warn({ user: name , mail }, "No existing account with this name.");
        }

        if (!(await isAccountExistingByMail(mail))) {
            error.mail = "No existing account with this mail.";
            req.log.warn({ user: name , mail }, "No existing account with this mail.");
        }

        if (error.mail || error.name) {
            return renderSignPage(res, {error, name, mail}, 400);
        }

        error.pwd = await logUser(name, mail, pwd);

        if (error.pwd) {
            req.log.warn({ user: name , mail }, "Invalid password attempt");
            return renderSignPage(res, {error:error, name, mail}, 401);
        }

        req.log.info({ user: name , mail }, "User logged in");
        return res.status(200).redirect(`/results?type=login`);
    } catch (err) {
        req.log.error({ err, user: req.body.name , mail: req.body.mail }, "Server error during login.");
        const error = {write: "Server error during login."};
        return renderSignPage(res, {error, name: req.body.name, mail: req.body.mail}, 500);
    }
})

module.exports = router;