const mongoose = require('mongoose');

var subscribeUsDetailSchema=mongoose.Schema({
    name:{type:String, required:true},
    emailAddress:{type:String,required:true}
});

// SCHEMA INTO MODEL
var subscribeUsDetail=mongoose.model("subscribeUsDetails",subscribeUsDetailSchema)

// EXPORTING THE MODEL
module.exports=subscribeUsDetail;