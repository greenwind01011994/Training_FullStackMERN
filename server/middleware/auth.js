const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization'); //'Authorization' lấy giá trị value header ra
    const token = authHeader && authHeader.splist(' ')[1]; // && là nêu không có authHeader thì nó sẽ chính là authHeader và nếu có authHeader thì nó là cái đăng sau && authHeader.split('') 

    if(!token)
    return res.status(401).json({success: false, message: 'Access token not found'});

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        req.userId = decoded.userId
        next();
    } catch (error) {
        console.log(error); // báo lỗi 
        res.status(403).json({
            success: false,
            message: 'Internal token error '
        }) //trả lại
    
    }
}
module.exports = verifyToken;