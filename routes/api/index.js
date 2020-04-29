const express = require("express");
const router = express.Router();



// handling requests
router.use("/v1", require("./v1"));



module.exports = router;