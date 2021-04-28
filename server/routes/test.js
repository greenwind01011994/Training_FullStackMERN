const express = require('express');
const router = express.Router();
const argon2 = require('argon2');//import ở đây

const User = require('../models/User');

//@route POST api/auth/register
//@desc Register user
//@access Public
router.post('/register', async(req,res) => { 
    const {username, password} = req.body;

    if(!username || !password)
    return res.status(400).json({success: false, message:'Missing username and/or password' });
    try {  
        const user = await User.findOne({username}); //username: username

        if(user)
        return res.status(400).json({success: false, message: 'Username already taken '});

        //all good
        const hashedPassword = await argon2.hash(password); 
        const newUser = new User({username, password: hashedPassword});
        await newUser.save(); //lưu vào cơ sở dữ liệu

        //trả lại token 
        const accessToken = jwt.sign({userId: newUser._id});
    } catch (error) {
        
    }
})

//exports file auth.js lại
module.exports = router;