const express = require('express')
const router = express.Router()
const ctrlAuth = require('../controller/auth.controller')
const { validationBody } = require('../middlewares/validationBody')
const { registerSchema } = require('../schemas/schema')


router.post("/signup", validationBody(registerSchema), ctrlAuth.register);
router.post("/login", ctrlAuth.login);
// router.post("/logout", );

module.exports = router
