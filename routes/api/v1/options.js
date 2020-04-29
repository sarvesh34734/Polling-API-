const express = require("express");
const router = express.Router();
const optionsController = require("../../../controllers/api/v1/options_controller");


// handling requests
router.post("/:optionId/delete", optionsController.deleteOption);
router.post("/:optionId/add_vote",optionsController.addVote);



module.exports = router;