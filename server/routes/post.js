const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

//@route POST api/posts
//@desc Create post
//@access Private //được hiểu: người dùng phải login mới tạo một post mới, một cái skill mới cần phải học  
router.post('/', async(req, res) => {
    const{title, description, url, status} = req.body; //ta lấy ra 
    
    //Simple validation
    if(!title)
        return res.status(400).json({
            success: false,
            message: 'Title is required'
        });
    try {
        const newPost = new Post({
            title, 
            description, //description đọc lấy ra ở req.body trên
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status: status || 'TO LEARN ',
            user: '608a2f92f604290ea868d4de'
        }); 
        await newPost.save();

        res.json({
            success: true,
            message: 'Happy Learning!!',
            post: newPost //trả lại post ở đây
        });
    
    } catch (error) {
        console.log(error); // báo lỗi 
        res.status(500).json({
            success: false,
            message: 'Internal server error '
        }); //trả lại    
    }
});

module.exports = router;