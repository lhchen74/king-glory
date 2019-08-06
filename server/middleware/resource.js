module.exports = option => {
    const inflection = require("inflection")
    return async (req, res, next) => {
        const modelName = inflection.classify(req.params.resource)
        const Model = require(`../models/${modelName}`)
        req.Model = Model // 将 Model 挂载到 req
        next()
    }
}