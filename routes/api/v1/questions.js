const express = require("express");
const router = express.Router();
const questionsController = require("../../../controllers/api/v1/questions_controller");


// handling requests
router.post("/create", questionsController.createQuestion);
router.post("/:questionId/options/create", questionsController.addOptions);
router.get("/:questionId", questionsController.viewQuestion);
router.delete("/:questionId/delete", questionsController.deleteQuestion);

module.exports = router;