const express = require('express');
const router = express.Router();
const argon2 = require('argon2'); 
const jwt = require('jsonwebtoken');

const User = require('../models/User');

//@route POST api/auth/register
//@desc Register user
//@access Public
router.post('/register', async(req,res) => {  
    const {username, password} = req.body; 

    //simple validation
    if(!username || !password) //nếu không có usernam hoặc password thì trả về 
    return res.status(400).json({success: false, message:'Missing username and/or password' });

    try {
        //check for existing user
        const user = await User.findOne({username}); // User mới import lúc nãy//username: username
        if(user)
        return res.status(400).json({success: false, message: 'Username already taken '});
        
        //all good // max hoá password đi
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({username, password: hashedPassword}); //password là hashedPassword đã mã hoá trên 
        await newUser.save(); //lưu vào cơ sở dữ liệu

        //trả lại token 
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET); //userId =newUser sau khi newUser.save()lưu rồi thì userId: newUser.-id được tạo ra(id được tạo ra) trong database và nó sẽ thành data đưa vào accessToken và khi người dùng gửi accessToken cho chúng ta thì ta móc ra được userId để kiểm tra
        res.json({success: true, message: 'user created successfully', accessToken});
    } catch (error) {
        
    }
})

//exports file auth.js lại
module.exports = router;