const express = require("express");
const mailRouter = require("./src/routes/mail.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/healthcheck", require("./routes/healthchecker"));

app.use("/mails", mailRouter);

app.listen(8080, () => {
  console.log("Server online");
});
