const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
{
  entrepreneurId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  advisorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  requirement:String,
  keywords:[String],

  status:{
    type:String,
    default:"pending"
  },

  meetLink:{
    type:String,
    default:""
  }
},
{timestamps:true}
);

module.exports = mongoose.model("Request", requestSchema);