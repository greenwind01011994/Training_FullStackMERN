const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization'); //'Authorization' lấy giá trị value header ra
    const token = authHeader && authHeader.splist(' ')[1]; // && là nêu không có authHeader thì nó sẽ chính là authHeader và nếu có authHeader thì nó là cái đăng sau && authHeader.split('') 
}