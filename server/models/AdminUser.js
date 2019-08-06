const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        select: false, // 在列表页不会显示密码，不然会对加密的密码再次加密
        set(val) { // 加密密码, bcrypt 不支持 node 12.4.0, use bcryptjs
            return require('bcryptjs').hashSync(val, 8);
        }
    },
})

module.exports = mongoose.model('AdminUser', schema)