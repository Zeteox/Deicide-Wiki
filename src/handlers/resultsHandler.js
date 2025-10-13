const express = require('express');
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
    const {type} = req.query;

    fs.readFile("./public/templates/result.html","utf-8",(err, data) => {
        if (err) {
            res.writeHead(404)
            res.write("File Not Found")
        } else {
            const updatedHtml = data.replace(
                /<h1.*>.*<\/h1>/,
                `<h1 class="text-4xl font-extrabold text-[#A68B5B] mb-2">${ type==="register" ? "Succesfully registered" : "Succesfully logged in" }</h1>`);
            res.writeHead(200, {
                "content-type":"text/html;charset=utf-8"
            })
            res.write(updatedHtml)
        }
        res.end()
    })
})

module.exports = router;