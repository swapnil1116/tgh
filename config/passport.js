const LocalStrategy=require("passport-local").Strategy;
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

// APN NE JO MODEL BANAYA THA APNI app.js MIEN USKO APN YAHAN require() KI MADAD SE IMPORT KRA LENGE
const userDetail=require("../models/userDetailModel")

module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:"mobileNumber"}, (mobileNumber,password,done)=>{
            //Matching User
            userDetail.findOne({mobileNumber:mobileNumber}, function(err,user){
                if(!user){ 
                    // THIS false HERE IS FOR USER AND IT MEANS TAHT THERE IS NO USER YET CAUSE IT RETURNED false
                    return done(null,false,{message:"Mobile Number Not Registered"});
                }
                // Match Password 
                bcrypt.compare(password,user.password, (err,isMatch)=>{
                    if(err) throw errr;
                    if(isMatch){
                        console.log("You logged in")
                        return done(null,user)
                    }else{
                        return done(null,false,{message:"Password Incorrect"}) 
                    }
                })
            })
        })
    )
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    
    passport.deserializeUser((id,done)=>{
        userDetail.findById(id,(err,user)=>{
            done(err,user)
        });
    });


};
