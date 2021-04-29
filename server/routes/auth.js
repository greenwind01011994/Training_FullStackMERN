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
        const accessToken = jwt.sign({
            userId: newUser._id},
            process.env.ACCESS_TOKEN_SECRET
        ); //userId =newUser sau khi newUser.save()lưu rồi thì userId: newUser.-id được tạo ra(id được tạo ra) trong database và nó sẽ thành data đưa vào accessToken và khi người dùng gửi accessToken cho chúng ta thì ta móc ra được userId để kiểm tra
        res.json({
            success: true,
             message: 'user created successfully',
              accessToken
        });
    } catch (error) {
        console.log(error); // báo lỗi 
        res.status(500).json({
            success: false,
            message: 'Internal server error '
        }) //trả lại
    }
})

//@route POST api/auth/Login
//@desc Login user
//@access Public
router.post('/login', async(req,res) => {
    const {username, password} = req.body;
    if(!username || !password)
    return res.status(400).json({success: false, message:'Missing username and/or password' });
    try {  
        const user = await User.findOne({username}); //username: username

        if(!user)
        return res.status(400).json({success: false, message: 'Incorrect username '});

        //username found 
        const passwordValid = await argon2.verify(user.password, password);
        if(!passwordValid)
        return res.status(400).json({success: false, message: 'Incorrect password'});
        

        //trả lại token 
        const accessToken = jwt.sign({
            userId: user._id},//user ta tìm được ở database xem đúng chưa
            process.env.ACCESS_TOKEN_SECRET
        ); //userId =newUser sau khi newUser.save()lưu rồi thì userId: newUser.-id được tạo ra(id được tạo ra) trong database và nó sẽ thành data đưa vào accessToken và khi người dùng gửi accessToken cho chúng ta thì ta móc ra được userId để kiểm tra
        res.json({
            success: true,
             message: 'user logged in successfully',
              accessToken
        });
    } catch (error) {
        console.log(error); // báo lỗi 
        res.status(500).json({
            success: false,
            message: 'Internal server error '
        }) //trả lại
    }
});

//exports file auth.js lại
module.exports = router;