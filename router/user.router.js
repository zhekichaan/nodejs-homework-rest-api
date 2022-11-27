const express = require('express');
const router = express.Router();
const ctrlUser = require('../controller/user.controller');
const { tryCatchWrapper } = require('../helpers');
const { auth } = require('../middlewares/auth');
const { validationBody } = require('../middlewares/validationBody');
const { authSchema, subscriptionSchema } = require('../schemas/schema');

router.post("/signup", validationBody(authSchema), tryCatchWrapper(ctrlUser.register));
router.post("/login", validationBody(authSchema), tryCatchWrapper(ctrlUser.login));
router.post("/logout", auth, tryCatchWrapper(ctrlUser.logout));
router.post("/current", auth, tryCatchWrapper(ctrlUser.current));
router.patch("/", auth, validationBody(subscriptionSchema), tryCatchWrapper(ctrlUser.updateSubscription));

module.exports = router;
