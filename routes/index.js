const express = require("express");
const router = express.Router();



// handling requests
router.use("/api", require("./api"));



module.exports = router;