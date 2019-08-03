module.exports = app => {
    const inflection = require("inflection")
    const express = require('express')
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
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    const modelTransferMiddleware = async (req, res, next) => {
        const modelName = inflection.classify(req.params.resource)
        const Model = require(`../../models/${modelName}`)
        req.Model = Model // 将 Model 挂载到 req
        next()
    }
    app.use('/admin/api/rest/:resource', modelTransferMiddleware, router)
}