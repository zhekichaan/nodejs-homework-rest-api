const express = require('express')
const router = express.Router()
const ctrlContact = require('../controller')
const { validationBody } = require('../middlewares/validationBody')
const { postSchema, putSchema } = require('../schemas/schema')

router.get('/', ctrlContact.get)

router.get('/:contactId', ctrlContact.getById)

router.post('/', validationBody(postSchema), ctrlContact.create)

router.delete('/:contactId', ctrlContact.remove)

router.put('/:contactId', validationBody(putSchema), ctrlContact.update)

module.exports = router
