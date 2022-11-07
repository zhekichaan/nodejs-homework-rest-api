const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')
const Joi = require("joi");
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId)
  console.log(contact);
  if(contact) {
    res.status(200).json(contact)
  } else {
    res.status(404).json({message: "Contact not found"})
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().min(3),
    phone: Joi.string().required().min(3),
  });

  const { error } = schema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  const contact = await addContact({ name, email, phone })
  res.status(201).json({ 
    message: 'new contact:',
    data: contact
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId)
  if(contact === null) {
    res.status(404).json({ message: "Not found" })
  }
  res.status(200).json({ message: 'contact deleted' })
})

router.put('/:contactId', async (req, res, next) => {
  const schema = Joi.object().required().min(1)
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: "missing fields",
    });
  }
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body)
  if(!contact) {
    res.status(404).json({ message: "Not found" })
  }
  res.status(200).json({ 
    message: 'updated contact:',
    data: contact
 })
})

module.exports = router
