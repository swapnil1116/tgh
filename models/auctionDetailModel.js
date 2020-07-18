const mongoose = require('mongoose');

//CREATING SCHEMA FOR THE DATA TO BE STORED IN DATABASE
var auctionDetailSchema=mongoose.Schema({
    name:String,
    mobileNumber:Number,
    pickUpCity:String,
    dropCity:String,
    load:String,
    item:Array,
    truck:String,
    datepicker:String,
    budget:Number
});

// SCHEMA INTO MODEL
var auctionDetail=mongoose.model("auctionDetails",auctionDetailSchema)

// EXPORTING THE MODEL
module.exports=auctionDetail;