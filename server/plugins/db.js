module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/king-glory', {
        useNewUrlParser: true,
        useFindAndModify: false
    })

    // 引用所有 models
    require('require-all')(__dirname + '/../models')
}