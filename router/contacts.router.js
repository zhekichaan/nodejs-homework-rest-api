const express = require('express');
const router = express.Router();
const ctrlContact = require('../controller/contacts.controller');
const { tryCatchWrapper } = require('../helpers');
const { auth } = require('../middlewares/auth');
const { validationBody } = require('../middlewares/validationBody');
const { postSchema, putSchema, patchSchema } = require('../schemas/schema');

router.get('/', tryCatchWrapper(ctrlContact.get));
router.post('/', auth, validationBody(postSchema), tryCatchWrapper(ctrlContact.create));
router.get('/:contactId', tryCatchWrapper(ctrlContact.getById));
router.delete('/:contactId', tryCatchWrapper(ctrlContact.remove));
router.put('/:contactId', validationBody(putSchema), tryCatchWrapper(ctrlContact.update));
router.patch('/:contactId/favorite', validationBody(patchSchema), tryCatchWrapper(ctrlContact.updateStatusContact));

module.exports = router;
