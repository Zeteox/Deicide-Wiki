require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(express.static("./public"))

//endpoints
app.use("/",indexHandler.js)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));