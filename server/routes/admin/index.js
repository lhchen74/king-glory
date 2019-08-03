module.exports = app => {
    const express = require('express')
    const router = express.Router() // 子路由
    const Category = require('../../models/Category')
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            "success": true
        })
    })
    router.get('/categories', async (req, res) => {
        // populate('parent')  通过关联字段 parent， 找到此 id 对应的对象
        const model = await Category.find().populate('parent').limit(10)
        res.send(model)
    })
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api', router)
}