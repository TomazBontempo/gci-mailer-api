const express = require("express");
const router = express.Router();
const sendEmail = require("../../sendEmail");

router.post("/", (req, res) => {
  console.log("Recebendo valores");
  const email = req.body.email;
  console.log(`Valor recebido: ${email}`);
  try {
    console.log("Chamando função");
    sendEmail(email);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
