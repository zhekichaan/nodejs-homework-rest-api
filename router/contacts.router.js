const express = require('express')
const router = express.Router()
const ctrlContact = require('../controller/contacts.controller')
const { validationBody } = require('../middlewares/validationBody')
const { postSchema, putSchema, patchSchema } = require('../schemas/schema')

router.get('/', ctrlContact.get)
router.post('/', validationBody(postSchema), ctrlContact.create)
router.get('/:contactId', ctrlContact.getById)
router.delete('/:contactId', ctrlContact.remove)
router.put('/:contactId', validationBody(putSchema), ctrlContact.update)
router.patch('/:contactId/favorite', validationBody(patchSchema), ctrlContact.updateStatusContact)

module.exports = router
