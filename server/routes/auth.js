const express = require('express');
const router = express.Router();

const User = require('../models/User');
//router.get('/', (req,res) => res.send('USER ROUTE'));

//@route POST api/auth/register
//@desc Register user
//@access Public
router.post('/register', async(req,res) => { //mỗi khi có post req gửi đến, chúng ta (req,res ) nói chuyện vs database thông qua mongoose  
    const {username, password} = req.body;

    //Simple validation
    if()
})

//exports file auth.js lại
module.exports = router;