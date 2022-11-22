const express = require('express');
const router = express.Router();
const ctrlAuth = require('../controller/auth.controller');
const { tryCatchWrapper } = require('../helpers');
const { auth } = require('../middlewares/auth');
const { validationBody } = require('../middlewares/validationBody');
const { authSchema } = require('../schemas/schema');


router.post("/signup", validationBody(authSchema), tryCatchWrapper(ctrlAuth.register));
router.post("/login", validationBody(authSchema), tryCatchWrapper(ctrlAuth.login));
router.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(ctrlAuth.logout));
router.post("/current", tryCatchWrapper(auth), tryCatchWrapper(ctrlAuth.current));


module.exports = router;
