// My IP Address : 157.34.99.189

const express=require("express");
const path=require("path")
const bcrypt=require("bcrypt")
const passport=require("passport")

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://satyammishra:satyam121212@cluster0.y2msr.mongodb.net/OurLogistics?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
// mongoose.connect(uri || 'mongodb://localhost/OurLogistics', {useNewUrlParser: true ,useUnifiedTopology:true});
const session=require("express-session");
const flash=require("connect-flash")
const  MongoDBStore = require('connect-mongodb-session')(session);
// INITIALIZING MONGOSTORE
const myMongoStore = new MongoDBStore({
    uri: 'mongodb://localhost/OurLogistics',
    collection: 'mySessions'
});

// INITIALIZING APP WITH EXPRESS()
const app=express();

// PASSPORT LOCAL STARTEGY FROM CONFIG FILE
require("./config/passport")(passport);
// ENVIRONMENT VARIABLES
const{
    PORT = process.env.PORT || 8000,
    NODE_ENV="development",
    session_Name="mySession",
    session_Secret="mySecret",
    session_Life=1000*60*60*8765  //SESSION LIFE = 1 YEAR
} = process.env

const IN_PROD = NODE_ENV === "production"


// EXPRESS SESSION
app.use(session({
    name:session_Name,
    resave:false,
    rolling:false,
    saveUninitialized:false,
    secret:session_Secret,
    cookie:{
        maxAge:session_Life,
        sameSite:"strict",
        secure:IN_PROD
    },
    store:myMongoStore
}))
// MAKING A MongoStore  
myMongoStore.on('error', function(error) {
    console.log(error);
});
// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())
//CONNECT FLASH
app.use(flash());

// FOR MAILING PURPOSE
const nodemailer = require('nodemailer');
const EmailAddress=require("./config/EmailAddress")


app.use("/static", express.static("static"))
//SETTING PUG ENGINE
app.set("view engine","pug")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded( {extended:true}))
//GLOBAL VARIABLES
// YEH FUNCTION KUCH NHI BS GLOBAL VARIABLES BANANE KE KAAM AATA HAI ISME APN NE APNE SESSION KO EK VARIABLE MEIN STORE KRWA LIYA HAI TAAKI APN USKO KAHIN PE BHI KISI BHI PUG TEMPLATE MEIN USE KR PAAYEIN BINA PAAS KARAYE BHII
app.use(function(req,res,next){
    res.locals.error=req.flash("error");
    res.locals.success_msg=req.flash("success_msg");
    next();
});

//IMPORTED THE subscribeUsDetailModel
var subscribeUsDetail=require("./models/subscribeUsModel")
var userDetail=require("./models/userDetailModel")
var auctionDetail=require("./models/auctionDetailModel")
var bidDetail=require("./models/bidDetailModel")
var bookingDetail=require("./models/bookingDetailModel")

// APN NE EK PRTOECTIVE LAYER BNA LI HAI KI JAISE AGR KOI BANDA SEEDHE LOGGEDIN PAGE PE JAANA CHAHEGA PRR KOI USER SESSION MEIN NHI HOGA TOH SEEDHE APN USKO REDIRECT KR DENGE "/login" ENDPOINT PE...
// ISKA YEH HAI KI AGR KOI USER SESSION MIEN NHI HIA TOH APN BANDE KO ANDAR KA PAGE NHI DIKHAENGE AGR BANDA ANDAR KE PAGE PE JAANE KI KOSHISH KAREGA TOH APN KO SEEDHE REDIRECT KARENGE "/login" KI PEHLE TUM LOGIN HO JAAO PHIR HUM DIKHAYENGE TUMKO ANDAR WALA PAGE
const redirectLogin=(req,res,next)=>{
    if(!req.user){
        req.flash("success_msg","You have to Login First in order to do that task");
        res.redirect("/login") 
    }else{
        next()
    }
}
// AUR ISKA YEH HAI KI AGAR BANDA LOGIN HO JAANE KE BAAD "/login" ENDPOINT PE JAAYEGA TOH APN USKO LOGIN NHI DIKHA SKTE KYU KIUSER SESSION MEIN HAI ISLIYE "/login" ENDPOINT PE JAANE PE BAND EKO SEEDHE ANDAR WALA PAGE DIKHAYENGE KYUKI USE LOGGEDIN HAI SITE MEIN ISLIYE USKO LOGIN PAGE DIKHAANE KA KOI SENSE NHI BANTA HAIS
const redirectLoggedin=(req,res,next)=>{
    if(req.user){
        res.redirect("/customer/dashboard")
    }else{
        next()
    }
}

app.get("/",redirectLoggedin,(req,res)=>{
    let AllErrors=[]
    // YEH APN NE REIGSTRATION KE LIYE BANAYA HAI TAAKI APN USER KO OTP WAGERA BHEJ SAKEIN
    const { mobileNumber } =req.session   
    if(req.user){
        res.render("home",{AllErrors,user:req.user})
    }
    else{
    res.render("home",{AllErrors})
    }
});
app.post("/",redirectLoggedin,(req,res)=>{
    let { name, emailAddress}=req.body;
    let AllErrors=[]
    if(!name){
        if(!emailAddress){
            AllErrors.push({msg:"Please Fill in all fields"})
            res.render("home",{AllErrors,name,emailAddress})
        }
        else{
        AllErrors.push({msg:"Please Enter Your Name"})
        res.render("home",{AllErrors,name,emailAddress})
        }
    }
    else if(!emailAddress){
        if(!name){
            AllErrors.push({msg:"Please Fill in all fields"})
            res.render("home",{AllErrors,name,emailAddress})
        }
        else{
            AllErrors.push({msg:"Please Enter Your Email Address "})
            res.render("home",{AllErrors,name,emailAddress})
        }
    }
    else{
        subscribeUsDetail.find({emailAddress:req.body.emailAddress},function(err,results){
            if(results && results.length>0){
                console.log("Email already Subscribed")
                AllErrors.push({msg:"Email Already Subscribed"})
                res.render("home",{AllErrors,name:name,emailAddress:emailAddress})
            }
            else{
                var subscribeUsDetailObject =  subscribeUsDetail(req.body);
        
                subscribeUsDetailObject.save(function(){
                
                    var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: EmailAddress.email,
                        pass: EmailAddress.password
                    }
                    });
                
                    var mailOptions = {
                    from: EmailAddress.email,
                    to: req.body.emailAddress,
                    subject: "You Subscribed 'Our Logistics'.",
                    text:`${req.body.name}, You will receive all the updates from "Our Logistics". Thank You For Subscribing "Our Logistics" Newsletter.`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response +" "+ "Send To : " + req.body.emailAddress);
                    }
                });
                console.log("Subscribed Now... And Saved In The Database")
                res.render("home",{AllErrors})
            })
            }
        })
    }    
})
app.get("/createAccount",redirectLoggedin,(req,res)=>{
    AllErrors=[]
    res.render("createAccount",{AllErrors})
})

app.post("/createAccount", redirectLoggedin,(req,res)=>{
 
    let { name, emailAddress,password,password2,mobileNumber,occupation,trucks}=req.body;
    let AllErrors=[]

    console.log(req.body.trucks)
    if(!name || !emailAddress || !password|| !password2){
        console.log("This is an error")
        AllErrors.push({msg:"Please fill in all fields"})
        res.render("createAccount",{AllErrors,name,emailAddress,password,password2,mobileNumber})
    } 
    else if(occupation==="choose"){
        console.log("Occupation not selected")
        AllErrors.push({msg:"Please Select Who You Are"})
        res.render("createAccount",{AllErrors,name,emailAddress,password,password2,mobileNumber})
    }
    else if(password.length<6 && password.length>0){
        console.log("This is an error")
        AllErrors.push({msg:"Password Must be atleast 6 characters "})
        res.render("createAccount",{AllErrors,name,emailAddress,password,password2,mobileNumber})
    }
    else if(password!==password2 && password.length>=6 ){
        console.log("This is an error")
        AllErrors.push({msg:"Passwords Didn't Matched"})
        res.render("createAccount",{AllErrors,name,emailAddress,password,password2,mobileNumber})
    }
    else{
        if(occupation==="A Carrier"){
            if(trucks===undefined){
                console.log("Trucks not selected")
                AllErrors.push({msg:"Please Select The Trucks You Have"})
                res.render("createAccount",{AllErrors,name,emailAddress,password,password2,mobileNumber,trucks})   
            }
            else{
                userDetail.find({mobileNumber:req.body.mobileNumber},async function (err,results){
                    if (results && results.length>0){
                        console.log("Mobile Number already registered")
                        AllErrors.push({msg:"Mobile Number Already Registered"})
                        res.render("createAccount",{AllErrors})
                    }else{
                        try{
                            function makeid(length){
                                let result           = '';
                                let characters       = '0123456789';
                                let charactersLength = characters.length;
                                for ( var i = 0; i < length; i++ ) {
                                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                }
                                return result;
                            }
                            random_string=makeid(6)
                            console.log(random_string)
                            const accountSid = 'AC70fc5d59ea014a17d177f6661c2573d7';
                            const authToken = '77e2cd1e1774b5ade7cb9d12f54ac507';
                            const client = require('twilio')(accountSid, authToken);
                            client.messages
                            .create({
                                body: `${req.body.name}, This is the OTP of "Our Logistics. It's Confidential please do not share it OTP: ${random_string} `,
                                from: '+12015815856',
                                to: `+91${req.body.mobileNumber}`
                            }).then(message => console.log(message.sid + " Message sent"));
        
                            req.session.mobileNumber=req.body.mobileNumber;
                            const hashedPassword= await bcrypt.hash(req.body.password,12)
                            userDetailObject= userDetail(req.body)
                            userDetailObject.password=hashedPassword;
                            res.redirect("/authenticate")
                            app.get("/authenticate",redirectLoggedin,(req,res)=>{
        
                                // FOR RESENDING THE OTP
                                app.get("/resend-otp",(req,res)=>{
                                    function makeidForResend(length){
                                        let result           = '';
                                        let characters       = '0123456789';
                                        let charactersLength = characters.length;
                                        for ( var i = 0; i < length; i++ ) {
                                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                        }
                                        return result;
                                    }
                                    random_string=makeidForResend(6)
                                    console.log(random_string + " resended")
                                    client.messages
                                    .create({
                                        body: `${userDetailObject.name}, This is the New OTP. It's Confidential please do not share it:  ${random_string} `,
                                        from: '+12015815856',
                                        to: `+91${userDetailObject.mobileNumber}`
                                    }).then(message => console.log(message.sid + " Message sent"));
                                    res.redirect("back") 
                                })
                                otp_send_to_mobileNumber=userDetailObject.mobileNumber
                                if(req.session.mobileNumber){
                                  res.render("otpSend",{AllErrors,otp_send_to_mobileNumber})
                                }  
                            });
                            app.post("/authenticate",redirectLoggedin,(req,res)=>{
                                AllErrors=[]
                                if(random_string==req.body.otp){
                                    userDetailObject.save(function(){
                                        const accountSid = 'AC70fc5d59ea014a17d177f6661c2573d7';
                                        const authToken = '77e2cd1e1774b5ade7cb9d12f54ac507';
                                        const client = require('twilio')(accountSid, authToken);
                                        client.messages
                                        .create({
                                            body: `You are the first User to get registered in "Our Logistics". Thank You For Registering`,
                                            from: '+12015815856',
                                            to: `+91${req.session.mobileNumber}`
                                        })
                                         .then(message => console.log(message.sid + " Message sent"));    
                                    console.log("User details saved in the database")
                                })     
                                res.redirect("/authenticationDone")
                                }
                                else{
                                    AllErrors.push({msg:"Incorrect OTP"})
                                    res.render("otpSend",{AllErrors})
                                }
                                app.get("/authenticationDone",redirectLoggedin,(req,res)=>{
                                    if(req.session.mobileNumber){
                                        res.render("phoneNumberVerified")
                                    }    
                                }) 
                                app.post("/authenticationDone",redirectLoggedin,(req,res)=>{
                                    req.session.destroy(function(err){
                                        res.clearCookie(session_Name);
                                        console.log("session destroyed")
                                        res.redirect("/login")
                                    });
                                    
                                })
                             })  
                        }    
                        catch{
                                res.render("createAccount",{AllErrors,name,emailAddress,password,password2,mobileNumber});
                            }
                        }    
                })        
            }
        }    
        else{
            userDetail.find({mobileNumber:req.body.mobileNumber},async function (err,results){
                if (results && results.length>0){
                    console.log("Mobile Number already registered")
                    AllErrors.push({msg:"Mobile Number Already Registered"})
                    res.render("createAccount",{AllErrors})
                }else{
                    try{
                        function makeid(length){
                            let result           = '';
                            let characters       = '0123456789';
                            let charactersLength = characters.length;
                            for ( var i = 0; i < length; i++ ) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                            }
                            return result;
                        }
                        random_string=makeid(6)
                        console.log(random_string)
                        const accountSid = 'AC70fc5d59ea014a17d177f6661c2573d7';
                        const authToken = '77e2cd1e1774b5ade7cb9d12f54ac507';
                        const client = require('twilio')(accountSid, authToken);
                        client.messages
                        .create({
                            body: `${req.body.name}, This is the OTP of "Our Logistics. It's Confidential please do not share it OTP: ${random_string} `,
                            from: '+12015815856',
                            to: `+91${req.body.mobileNumber}`
                        }).then(message => console.log(message.sid + " Message sent"));
    
                        req.session.mobileNumber=req.body.mobileNumber;
                        const hashedPassword= await bcrypt.hash(req.body.password,12)
                        userDetailObject= userDetail(req.body)
                        userDetailObject.password=hashedPassword;
                        res.redirect("/authenticate")
                        app.get("/authenticate",redirectLoggedin,(req,res)=>{
    
                            // FOR RESENDING THE OTP
                            app.get("/resend-otp",(req,res)=>{
                                function makeidForResend(length){
                                    let result           = '';
                                    let characters       = '0123456789';
                                    let charactersLength = characters.length;
                                    for ( var i = 0; i < length; i++ ) {
                                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                    }
                                    return result;
                                }
                                random_string=makeidForResend(6)
                                console.log(random_string + " resended")
                                client.messages
                                .create({
                                    body: `${userDetailObject.name}, This is the New OTP. It's Confidential please do not share it:  ${random_string} `,
                                    from: '+12015815856',
                                    to: `+91${userDetailObject.mobileNumber}`
                                }).then(message => console.log(message.sid + " Message sent"));
                                res.redirect("back") 
                            })
                            otp_send_to_mobileNumber=userDetailObject.mobileNumber
                            if(req.session.mobileNumber){
                              res.render("otpSend",{AllErrors,otp_send_to_mobileNumber})
                            }  
                        });
                        app.post("/authenticate",redirectLoggedin,(req,res)=>{
                            AllErrors=[]
                            if(random_string==req.body.otp){
                                userDetailObject.save(function(){
                                    const accountSid = 'AC70fc5d59ea014a17d177f6661c2573d7';
                                    const authToken = '77e2cd1e1774b5ade7cb9d12f54ac507';
                                    const client = require('twilio')(accountSid, authToken);
                                    client.messages
                                    .create({
                                        body: `You are the first User to get registered in "Our Logistics". Thank You For Registering`,
                                        from: '+12015815856',
                                        to: `+91${req.session.mobileNumber}`
                                    })
                                     .then(message => console.log(message.sid + " Message sent"));    
                                console.log("User details saved in the database")
                            })     
                            res.redirect("/authenticationDone")
                            }
                            else{
                                AllErrors.push({msg:"Incorrect OTP"})
                                res.render("otpSend",{AllErrors})
                            }
                            app.get("/authenticationDone",redirectLoggedin,(req,res)=>{
                                if(req.session.mobileNumber){
                                    res.render("phoneNumberVerified")
                                }    
                            }) 
                            app.post("/authenticationDone",redirectLoggedin,(req,res)=>{
                                req.session.destroy(function(err){
                                    res.clearCookie(session_Name);
                                    console.log("session destroyed")
                                    res.redirect("/login")
                                });
                                
                            })
                         })  
                    }    
                    catch{
                            res.render("createAccount",{AllErrors,name,emailAddress,password,password2,mobileNumber});
                        }
                    }    
            })        
        }
        
        
    } 
});

app.get("/login" ,redirectLoggedin, (req,res)=>{
    AllErrors=[]
    res.render("login")
})
app.post("/login",redirectLoggedin, (req,res,next)=>{
    passport.authenticate("local",{
        successRedirect:"/customer/dashboard",
        failureRedirect:"/login",
        failureFlash:true
    })(req,res,next);
    
})
app.get("/forgetPassword",(req,res)=>{
    AllErrors=[]
    res.render("ForgetPasswordEnterMobileNumber",{AllErrors})
})
app.post("/forgetPassword",redirectLoggedin,(req,res)=>{

    AllErrors=[]
    mobileNumber=req.body.mobileNumber;
    function makeid(length){
        let result           = '';
        let characters       = '0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    random_string=makeid(6)
    console.log(random_string)
    const accountSid = 'AC70fc5d59ea014a17d177f6661c2573d7';
    const authToken = '77e2cd1e1774b5ade7cb9d12f54ac507';
    const client = require('twilio')(accountSid, authToken);
    client.messages
    .create({
        body: `${req.body.name}, This is the otp for your forgotten password. It's Confidential please do not share it OTP: ${random_string} `,
        from: '+12015815856',
        to: `+91${req.body.mobileNumber}`
    }).then(message => console.log(message.sid + " Message sent"));
    userDetail.findOne({mobileNumber:req.body.mobileNumber}, async function(err,user){
        if(user){
            req.session.forgotPassword=req.body.mobileNumber;
            console.log("session created");
            res.redirect("/forgetPassword/OTPSent")
            app.get("/forgetPassword/OTPSent",redirectLoggedin,(req,res)=>{
                AllErrors=[]
                                // FOR RESENDING THE OTP
                                app.get("/resend-otp",(req,res)=>{
                                    function makeidForResend(length){
                                        let result           = '';
                                        let characters       = '0123456789';
                                        let charactersLength = characters.length;
                                        for ( var i = 0; i < length; i++ ) {
                                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                        }
                                        return result;
                                    }
                                    random_string=makeidForResend(6)
                                    console.log(random_string + " resended")
                                    client.messages
                                    .create({
                                        body: `${user.name}, This is the New OTP. It's Confidential please do not share it:  ${random_string} `,
                                        from: '+12015815856',
                                        to: `+91${user.mobileNumber}`
                                    }).then(message => console.log(message.sid + " Message sent"));
                                    req.flash("success_msg","OTP Sent Again, Enter New OTP")
                                    res.redirect("back") 
                                })
                if(req.session.forgotPassword){
                res.render("ForgetPasswordOtpSend",{AllErrors ,otp_send_to_mobileNumber:user.mobileNumber})
                }
            })
            app.post("/forgetPassword/OTPSent",redirectLoggedin,(req,res)=>{
                if(req.session.forgotPassword){
                    
                    AllErrors=[]
                    if(random_string===req.body.otp){
                        res.redirect("/setNewPassword")
                    }
                    else{
                        AllErrors.push({msg:"Incorrect OTP"})
                        res.render("ForgetPasswordOtpSend",{AllErrors:AllErrors, otp_send_to_mobileNumber:user.mobileNumber})
                    }
                }              

            })
            app.get("/setNewPassword",redirectLoggedin,(req,res)=>{
                if(req.session.forgotPassword){
                    res.render("ForgetPasswordSetNewPassword")
                }
            })
            app.post("/setNewPassword", redirectLoggedin, async(req,res)=>{
                const hashedPassword= await bcrypt.hash(req.body.password,12)
                 
                if(req.session.forgotPassword){
                    
                    AllErrors=[]
                    let { password,password2}=req.body;
                    if( !password|| !password2){
                        AllErrors.push({msg:"Please Fill in All Fields"})
                        res.render("ForgetPasswordSetNewPassword",{AllErrors,password,password2})
                    }
                    else if(password.length<6 && password.length>0){
                        console.log("This is an error")
                        AllErrors.push({msg:"Password Must be atleast 6 characters "})
                        if(req.session.forgotPassword){
                            res.render("ForgetPasswordSetNewPassword",{AllErrors,password,password2})
                        }
                    }
                    else if(password!==password2 && password.length>=6 ){
                        console.log("This is an error")
                        AllErrors.push({msg:"Passwords Didn't Matched"})
                        if(req.session.forgotPassword){
                            res.render("ForgetPasswordSetNewPassword",{AllErrors,password,password2})
                        }
                    }
                    bcrypt.compare(req.body.password,user.password,function(err,result){
                        if(err){
                            console.log(err)
                        }
                        if(result){
                            console.log("New Password can't be same as old password")
                            AllErrors.push({msg:"New Password can't be same as old password"})
                            if(req.session.forgotPassword){
                                res.render("ForgetPasswordSetNewPassword",{AllErrors,password,password2})
                            }
                        }
                        else{
                            console.log("It is a new password ")
                            userDetail.updateOne({mobileNumber:user.mobileNumber},{$set:{password:hashedPassword}},function(){
                                console.log("Password changed")
                            })
                            res.redirect("/passwordChanged")
                            app.get("/passwordChanged",redirectLoggedin,(req,res)=>{
                                if(req.session.forgotPassword){
                                    res.render("ForgetPasswordChanged")
                                    }
                            })
                            app.post("/passwordChanged",redirectLoggedin,(req,res)=>{
                                req.session.destroy(function(err){
                                    res.clearCookie(session_Name);
                                    console.log("session destroyed")
                                    res.redirect("/login")
                                });
                            })
        
                        }
                    })
                }    
            })

        }
        else{
            AllErrors.push({msg:"You are not registered. Please create an Account first."})
            res.render("ForgetPasswordEnterMobileNumber",{AllErrors})
        }
    })
})
app.get("/customer/dashboard",redirectLogin,(req,res)=>{
    if(req.user.occupation==="A consigner"){
        auctionDetail.find({mobileNumber:req.user.mobileNumber},(err,UserAuctions) =>{
            
            res.render("dashboard",{user:req.user,UserAuctions:UserAuctions})
        })
    }
    else if(req.user.occupation==="A Carrier"){
        auctionDetail.find((err,AllAuctions) =>{
            
            res.render("dashboardForTruckOwner",{user:req.user,AllAuctions:AllAuctions})
        })
    }
})
app.get("/customer/createNewAuction",redirectLogin,(req,res)=>{
    AllErrors=[]

    if(req.user.occupation==="A consigner"){
            res.render("newAuction",{user:req.user,AllErrors})
    }
        

})
app.post("/customer/createNewAuction",redirectLogin,(req,res)=>{

    if(req.user.occupation==="A consigner"){    
            let { pickUpCity, dropCity,load,truck,item,datepicker,budget}=req.body;
            let AllErrors=[]
            if(!pickUpCity || !dropCity || !load || !truck || !item || !datepicker ||!budget){
                console.log("This is an error")
                console.log(req.body)
                AllErrors.push({msg:"Please fill in all fields"})
                res.render("newAuction",{AllErrors, pickUpCity, dropCity,load,truck,item,datepicker})
            }   
            else if(pickUpCity===dropCity){
                console.log("Pick up city and  Drop city can't be same")
                AllErrors.push({msg:"Pick up city and  Drop city can't be same"})
                res.render("newAuction",{AllErrors, pickUpCity, dropCity,load,truck,item,datepicker})
            }
            else{
                console.log(req.body)
                auctionDetailObject= auctionDetail(req.body)
                auctionDetailObject.name=req.user.name;
                auctionDetailObject.mobileNumber=req.user.mobileNumber;
                auctionDetailObject.save(()=>{
                    console.log("Auction Details saved in database");
                    res.redirect("/customer/dashboard")
                })
            }
    }
            
})
app.get("/viewBids/:id",redirectLogin,(req,res)=>{
        AllErrors=[]

    if(req.user.occupation==="A consigner"){
        auctionDetail.find({_id:req.params.id},function(err,thisAuction){
            bidDetail.find({auctionId:req.params.id},function(err,AllBiddings){
                if(AllBiddings){
                    res.render("viewBiddings",{AllErrors:AllErrors,thisAuction:thisAuction[0],user:req.user,auctionId:req.params.id,AllBiddings:AllBiddings})
                }
            })

        })
    }    
})
app.get("/deleteAuction/:id",(req,res)=>{
    AllErrors=[]
    auctionDetail.deleteOne({_id:req.params.id},function(err,thisAuction){
        bidDetail.deleteMany({auctionId:req.params.id},function(err){
            console.log("Bids Deleted")
        });
        console.log("Auction Deleted")
        res.redirect("/customer/dashboard")
    });
})
app.get("/doBid/:id", redirectLogin, (req,res)=>{
    AllErrors=[]
    if(req.user.occupation==="A Carrier"){
        truckOwnersBidArray=[]
        auctionDetail.find({_id:req.params.id},function(err,thisAuction){
            bidDetail.find({auctionId:req.params.id},(err,thisBid)=>{
                for(i=0;i<thisBid.length;i++){
                    truckOwnersBidArray.push(thisBid[i].truckOwnersBid)
                }
                truckOwnersBidArray.sort()
                lowestBid=truckOwnersBidArray[0]
                totalBids=thisBid.length;
                res.render("BidNowForTruckOwner",{AllErrors:AllErrors,thisAuction:thisAuction[0],user:req.user,auctionId:req.params.id,totalBids:totalBids,lowestBid:lowestBid})
            })
        })
    }    
});
app.post("/doBid/:id", redirectLogin, (req,res)=>{
    AllErrors=[]
        if(req.user.occupation==="A Carrier"){
            let { truckOwnersBid }=req.body;

            auctionDetail.find({_id:req.params.id},function(err,thisAuction){
                if(!truckOwnersBid){
                    console.log("Bidding Amount Not Entered")
                    AllErrors.push({msg:"Please Enter Your Bidding Amount."})
                    res.render("BidNowForTruckOwner",{AllErrors:AllErrors,thisAuction:thisAuction[0],user:req.user,auctionId:req.params.id})
                }
                else{
                    // console.log(thisAuction[0])
                    if(truckOwnersBid>thisAuction[0].budget){
                            console.log("You can't bid higher than Consignees Budget.")
                            AllErrors.push({msg:"You can't bid higher than Consignees Budget."})
                            res.render("BidNowForTruckOwner",{AllErrors:AllErrors,thisAuction:thisAuction[0],user:req.user,auctionId:req.params.id})
                    }
                    else{
                        bidDetailObject= bidDetail({
                            auctionId:req.params.id,
                            ConsigneeName:thisAuction[0].name,
                            ConsigneeMobileNumber:thisAuction[0].mobileNumber,
                            pickUpCity:thisAuction[0].pickUpCity,
                            dropCity:thisAuction[0].dropCity,
                            load:thisAuction[0].load,
                            item:thisAuction[0].item,
                            truck:thisAuction[0].truck,
                            datepicker:thisAuction[0].datepicker,
                            budget:thisAuction[0].budget,
                            truckOwnersName:req.user.name,
                            truckOwnersMobileNumber:req.user.mobileNumber,
                            truckOwnersBid:req.body.truckOwnersBid
                        })
                        // console.log(bidDetailObject + "Bid detail object")
                        bidDetailObject.save(()=>{
                            console.log("Bid Details Saved In the database")
                            res.redirect("/customer/dashboard")
                            
                        })
                    }
                    
                }
            })
        }    
    
});

app.get("/carrier/pendingBids",redirectLogin,(req,res)=>{
    if(req.user.occupation==="A Carrier"){
        bidDetail.find({truckOwnersMobileNumber:req.user.mobileNumber},function(err,UserBids){
            res.render("pendingBidsForTruckOwner",{user:req.user,UserBids:UserBids})
        })
    }
})
app.get("/acceptBid/:id",redirectLogin,(req,res)=>{
    AllErrors=[]
        bidDetail.findOne({_id:req.params.id},(err,thisBid)=>{
            // console.log(req.params.id)
            console.log(thisBid.auctionId)
            auctionDetail.findOne({_id:thisBid.auctionId},function(err,thisAuction){
                console.log(thisAuction)
                    bookingDetailObject=bookingDetail({
                        auctionId:req.params.id,
                        ConsigneeName:req.user.name,
                        ConsigneeMobileNumber:req.user.mobileNumber,
                        pickUpCity:thisAuction.pickUpCity,
                        dropCity:thisAuction.dropCity,
                        load:thisAuction.load,
                        item:thisAuction.item,
                        truck:thisAuction.truck,
                        datepicker:thisAuction.datepicker,
                        budget:thisAuction.budget,
                        truckOwnersName:thisBid.truckOwnersName,
                        truckOwnersMobileNumber:thisBid.truckOwnersMobileNumber,
                        truckOwnersBid:thisBid.truckOwnersBid
                    })    
                
                    bookingDetailObject.save(function(){
                        auctionDetail.deleteOne({_id:thisBid.auctionId},function(err,thisAuction){
                            
                            bidDetail.deleteMany({auctionId:thisBid.auctionId},function(err){
                                console.log("Current Booking saved in database")
                                console.log("Bids Deleted")
                                console.log("Auction Deleted")
                                res.redirect("/currentBookings")
                            })
                        })
                    })
            })
        })

})
app.get("/currentBookings",function(req,res){
    if(req.user.occupation==="A consigner"){
        bookingDetail.find({ConsigneeMobileNumber:req.user.mobileNumber},(err,UserBookings)=>{

            res.render("currentBookingForConsignee",{user:req.user,UserBookings:UserBookings})
        })
    }
    else if(req.user.occupation==="A Carrier"){
        bookingDetail.find({truckOwnersMobileNumber:req.user.mobileNumber},(err,UserBookings)=>{
            res.render("currentBookingForCarrier",{user:req.user,UserBookings:UserBookings})
        })
    }    
})
app.get("/logout",redirectLogin,(req,res)=>{
    req.logout();
    res.redirect("/login")
    req.flash("success_msg", "You are logged out")
    console.log("You logged out")
})
app.listen(PORT,()=>{
    console.log("Our Website Started On Port 8000.....")
});

