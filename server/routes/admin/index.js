module.exports = app => {
    const express = require('express')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        // app.use('/admin/api/rest/:resource', router) 可以获取父级路由的参数 resource
        mergeParams: true
    }) // 子路由
    // const Category = require('../../models/Category')
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            "success": true
        })
    })
    router.get('/', async (req, res) => {
        // populate('parent')  通过关联字段 parent， 找到此 id 对应的对象
        // const model = await req.Model.find().populate('parent').limit(10)
        // res.send(model)
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    const authMiddleware = require('../../middleware/auth')

    // const modelTransferMiddleware = async (req, res, next) => {
    //     const modelName = inflection.classify(req.params.resource)
    //     const Model = require(`../../models/${modelName}`)
    //     req.Model = Model // 将 Model 挂载到 req
    //     next()
    // }

    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)



    // 上传中间件
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password
        } = req.body

        // 1. 根据用户名查找用户
        const user = await AdminUser.findOne({
            username: username
        }).select("+password") // 查询时把密码也查询出来

        assert(user, 422, "用户不存在")
        // if (!user) {
        //     return res.status(422).send({
        //         message: "用户不存在"
        //     })
        // }

        // 2. 校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, "密码错误")
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: "密码错误"
        //     })
        // }

        // 3. 返会 token
        const token = jwt.sign({
            id: user._id
        }, app.get('secret')) // app.set('secret', 'ijdovnjvnurgjdnv')
        res.send({
            token
        })

    })

    // 错误处理 (捕获 assert 的异常)
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}