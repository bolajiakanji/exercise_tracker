const mongoose = require("mongoose");
const {convertDateGiven}= require('../utils/dateConversion')

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  duration: {         
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    
  },
});

module.exports=mongoose.model('Exercise', exerciseSchema)
