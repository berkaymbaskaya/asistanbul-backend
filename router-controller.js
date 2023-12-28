// Imports
const { Router } = require("express");
const { startRouter } = require("./routes/start-router");
const { asistanbul } = require("./ai/asistanbul");
const { createAsistan } = require("./ai/create-asistan");
const { createThread } = require("./ai/create-thread");
const { asistanUpdate } = require("./ai/asistan-update");
const { createImage } = require("./ai/create-image");
// router config
const router = Router();
// routes
router.get("/start", startRouter);
//şeyda
router.get("/createAsistan", createAsistan);
router.get("/createThread", createThread);
router.post("/asistanbul", asistanbul);
router.get("/asistanUpdate", asistanUpdate);
router.get("/createImage", createImage);

//export
module.exports = router;
