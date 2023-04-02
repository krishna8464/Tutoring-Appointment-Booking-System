const express = require('express');


const {Feedback} = require('../Models/feedback.model');
const FeedbackRouter = express.Router();


//Post feedback
FeedbackRouter.post('/StudentFeedback', async (req, res) => {
  try {
    const {name,email,message} = req.body;
    const feedback = new Feedback({name,email,message})
    await feedback.save();
    res.status(201).send({"msg":"feedback added","feedback":feedback});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  }
});


//all feedback
FeedbackRouter.get("/allFeedback", async(req,res)=>{
    try{
        const feed= await Feedback.find()
        res.status(201).send({"feedback":feed});
    }
    catch(err){
        res.status(500).json({message: 'Internal server error'});
    }
})

module.exports = {FeedbackRouter} ;