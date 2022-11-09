const validationBody = (schema) => {
    return function(req, res, next) {
        const { error } = schema.validate(req.body);
        console.log(error);
        next(error)
    }
}

module.exports = {
    validationBody
}