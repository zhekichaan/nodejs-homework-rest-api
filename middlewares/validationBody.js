const validationBody = (schema) => {
    return function(req, res, next) {
        const { error } = schema.validate(req.body);
        next(error)
    }
}

module.exports = {
    validationBody
}