const express = require('express'); 
const router = express.Router();
const {checkAuth} =require('../middleware/checkauth');

// require Models
const Color = require('../models/colorModel');
const User = require('../models/userModel');


router.get('/color/create',checkAuth,async(req,res)=>{
    const currentUser = req.user;
    console.log(req.user);
    res.render('create',{currentUser});
})

router.get('/user/colors/show/:id',checkAuth,async(req,res)=>{
    const currentUser = await User.findById(req.user._id);
    const user = await User.findById(req.params.id).populate('colors');
    res.render('userPalletes',{currentUser,user});

})


router.get('/color/single/:id',checkAuth,async(req,res)=>{

    const color = await Color.findById(req.params.id).populate('owner');
    const currentUser = await User.findById(req.user._id);
    res.render('colorShow',{currentUser,color});

})

router.get('/color/single/edit/:id',checkAuth,async(req,res)=>{

    const currentUser = await User.findById(req.user._id);
    const color = await Color.findById(req.params.id).populate('owner');
    res.render('colorEdit',{currentUser,color});

})











module.exports = router;