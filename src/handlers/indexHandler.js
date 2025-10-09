const express = require('express');
const fs = require("fs");
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

module.exports = router;