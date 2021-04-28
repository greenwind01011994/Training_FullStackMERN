const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now //now().
    }
})

module.exports = mongoose.model('users',UserSchema) //users là tên của table, tên bảng của database (trong mongodb là collection)
