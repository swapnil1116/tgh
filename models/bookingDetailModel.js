const mongoose = require('mongoose');

//CREATING SCHEMA FOR THE DATA TO BE STORED IN DATABASE
var bookingDetailSchema=mongoose.Schema({
    auctionId:String,
    ConsigneeName:String,
    ConsigneeMobileNumber:Number,
    pickUpCity:String,
    dropCity:String,
    load:String,
    item:Array,
    truck:String,
    datepicker:String,
    budget:Number,
    truckOwnersName:String,
    truckOwnersMobileNumber:Number,
    truckOwnersBid:Number
});

// SCHEMA INTO MODEL
var bookingDetail=mongoose.model("bookingDetails",bookingDetailSchema)

// EXPORTING THE MODEL
module.exports=bookingDetail;