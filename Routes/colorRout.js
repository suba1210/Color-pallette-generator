const express = require('express'); 
const router = express.Router();
const {checkAuth} =require('../middleware/checkauth');

// require Models
const Color = require('../models/colorModel');


router.get('/color/create',checkAuth,async(req,res)=>{
    const currentUser = req.user;
    console.log(req.user);
    res.render('create',{currentUser});
})











module.exports = router;