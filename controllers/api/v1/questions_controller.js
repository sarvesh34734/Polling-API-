const mongoose = require("mongoose");
const Question = require("../../../models/question");
const Option = require("../../../models/option");
// create a question using "/api/v1/questions/create"
module.exports.createQuestion = function (req, res, next) {
    const question = new Question({
        title: req.body.title
    });

    // saving question and executing callback
    question
        .save()
        .then((question) => {
            console.log("Question created successfully");
            res.status(200).json({
                success: true,
                message: "Question created successfully",
                question: question.title
            })
        })
        .catch((err) => {
            console.log("Error creating question :: ", err);
            res.status(200).json({
                error: err
            })
        })
}

// add an option to a particular question using "/api/v1/questions/:questionId/options/create"
module.exports.addOptions = async function (req, res, next) {

    try {
        const id = req.params.questionId;

        let question = await Question.findById(id);
        let options = req.body.options;
        console.log(options[0].text);
        if (question) {

            // creating new options from options array and appending it to optionsObjects array
            const optionsObjects = [];
            for (let i = 0; i < options.length; i++) {
                optionsObjects[i] = await Option.create({
                    text: options[i].text,
                    votes: 0,
                    question: id
                });
            }

            // appending link_to_votes to our options
            for (let i = 0; i < optionsObjects.length; i++) {
                const optionId = optionsObjects[i]._id;
                // find the particular option and update link_to_vote
                const link = "http://localhost:8000/api/v1/options/" + optionId + "/add_vote";
                await Option.findByIdAndUpdate(optionId, { link_to_vote: link });
                question.options.push(optionId);
            }

            // save the question
            question.save();
            res.status(200).json({
                success: true,
                message: "options added successfully"
            });
        } else {
            res.status(404).json({
                error: "Question not found"
            })
        }
    }
    catch{
        (error) => {
            console.log("Error adding options :: ", error);
            res.status(500).json({
                error: error
            })
        }
    }

}

// view a question and its options by "/api/v1/questions/:questionId"
module.exports.viewQuestion = async function (req, res) {
    const id = req.params.questionId;

    // find question by id and populate the options
    let question = await Question.findById(id, ("title, options")).populate({
        path: "options",
        select: "text votes link_to_vote"
    })

    if (question) {
        res.status(200).json({
            success: true,
            question: question
        })
    } else {
        res.status(404).json({
            error: "Question not found"
        });
    }
}

// delete a question using "/api/v1/questions/:questionId/delete"
module.exports.deleteQuestion = async function (req, res) {

    try {
        // get id from params
        const id = req.params.questionId;
        // find question by id and populate options
        let question = await Question.findById(id, ("options")).populate({
            path: "options",
            select: "votes"
        });
        if (!question) {
            return res.status(404).json({
                error: "Question not found"
            });
        }
        
        const options = question.options;
        // check if any f the options have votes greater than 0       
        for (let i = 0; i < options.length; i++) {
            if (options[i].votes != 0) {
                return res.status(404).json({
                    error: "Cannot delete question as one of the options has votes greater than 0"
                })
            }
        }
        // we can't delete as one of the options has votes>0
        await Option.deleteMany({ question: id });
        await Question.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Question deleted successfully"
        });

    } catch{
        (err) => {
            res.status(500).json({
                error: err
            })
        }
    }
}






