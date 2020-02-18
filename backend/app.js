const express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(cookieParser());

app.set('port', 6000);
app.listen(app.get('port'));
app.use("/", indexRouter);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

