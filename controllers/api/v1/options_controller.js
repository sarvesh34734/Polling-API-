const Option = require("../../../models/option");
const Question = require("../../../models/question");
const mongoose = require("mongoose");

// delete an option using "/option/:optionId/delete"
module.exports.deleteOption = async function(req,res){
    
    try{
            // storing optioId in id
            const id = req.params.optionId;
        
            // find option by the id
            let option = await Option.findById(id);
            // if we cant find object return error
            if(!option){
                return res.status(404).json({
                    error:"Object with his id does not exist"
                });
            }
            // if vote>0 return error message
            if(option.votes>0){
                return res.status(404).json({
                    message:"Cannot delete object as number of votes > 0"
                });
            }else{
                await Option.findByIdAndDelete(id);
                return res.status(200).json({
                    success:true,
                    message:`Object with id ${id} successfully deleted`
                })
            }   
    }catch{
        (err)=>{
            console.log("Error deleting object :: ",err);
            return res.status(200).json({
                error:err
            })
        }
    }    
}

// add vote to an option using "/api/v1/options/:optionId/add_vote"
module.exports.addVote = async function(req,res){   
    
    try{
        // get id form req
        const id = req.params.optionId;
        let option = await Option.findById(id);
        
        // check if option is found or not
        if(!option){
            res.status(404).json({
                error:"Object not found"
            })
        }
        option.votes+=1;
        option.save();
        res.status(200).json({
            success:true,
            message:`You have successfully voted for ${option.text}`
        })
    }catch{(err)=>{
        console.log("Error adding vote :: ",err);
        res.status(500).json({
            error:err
        })
    }}    
}