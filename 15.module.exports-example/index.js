const express = require("express");
const app = express();
const port = 5000;

const fearsome = (req, res, next) => {};

const quiteTall = (req, res, next) => {};

app.use(require("./controllers"));

app.get("/lion/george", (res, req) => {});

app.get("/giraffe/anne", (res, req) => {});

app.get("/giraffe/helga", (res, req) => {});

app.get("/giraffe/bert", (res, req) => {});

app.get("/lion/percy", (res, req) => {});

app.get("/lion/millicent", (res, req) => {});

app.get("/lion/elgebert", (res, req) => {});

app.listen(port, () => console.log(`running on ${port}`));
