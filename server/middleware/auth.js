module.exports = options => { // options 外部传入的参数, 扩展性更强
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    const jwt = require('jsonwebtoken')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        // assert(token, 401, "请提供 jwt token")
        assert(token, 401, "请先登录")
        const {
            id
        } = jwt.verify(token, req.app.get('secret')) // 在中间件内可以通过 req.app 访问 app  req.app <=> app
        // assert(id, 401, "无效的 jwt token")
        assert(id, 401, "请先登录")
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, "请先登录")
        await next()
    }
}