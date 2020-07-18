const mongoose = require('mongoose');

//CREATING SCHEMA FOR THE DATA TO BE STORED IN DATABASE
var userDetailSchema=mongoose.Schema({
    name:String,
    emailAddress:String,
    mobileNumber:Number,
    password:String,
    occupation:String,
    trucks:Array
});

// SCHEMA INTO MODEL
var userDetail=mongoose.model("userDetails",userDetailSchema)

// EXPORTING THE MODEL
module.exports=userDetail;