// imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();
client.on("message", (message) => {
  function decodeString(encodedString) {
    return atob(encodedString);
  }
  const returMessage =
    "Merhaba, ben Asistanbul ! Aradığınız konum linkte sizi beklemektedir ! :) " +
    decodeString(message.body);
  client.sendMessage(message.from, returMessage);
});
// const { exec } = require('child_process');
// const { OpenAIApi } = require("openai")
//config
app.use(bodyParser.json());
app.use(cors());
app.use(require("./router-controller"));
app.listen(1923, () => console.log("Hackathon Backend 1923 portunda aktif !"));
