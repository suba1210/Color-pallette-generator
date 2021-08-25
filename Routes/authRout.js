const express = require('express'); 
const router = express.Router();
const passport = require('passport');

// require Models
const Color = require('../models/colorModel');
const User = require('../models/userModel');


router.get('/register',async(req,res)=>{
    res.render('register');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/register',async(req,res)=>{
    try{
        const {email,username,password} = req.body;
        const user = new User({email,username});
        const registerUser = await User.register(user,password);
        req.flash("success_msg", "Successfully registered, You can Login now!");
        res.redirect('/login');      
    }catch(err){
        console.log(err);
        if(err.message == "A user with the given username is already registered"){
            req.flash("error_msg", "Username already in use! Try again!");
        }
        else if (err.keyValue.email){
            req.flash("error_msg", "This email is already registered! Try again!");
        }
        else {
            req.flash("error_msg", "Sorry! Unable to register");
        }
        res.redirect("/register");        
    }
})


router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
    req.flash("success_msg", "Welcome to Coolors!");
    res.redirect('/color/create');
})






module.exports = router;