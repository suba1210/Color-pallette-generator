const express = require('express'); 
const router = express.Router();


// require Models
const User = require('../models/colorModel');


router.get('/color/create',async(req,res)=>{
    res.render('create');
})












module.exports = router;