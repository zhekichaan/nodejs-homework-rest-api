const models = require('../models/contacts')

const get = async (req, res, next) => {
  try {
    const contacts = await models.listContacts()
    res.status(200).json(contacts)
  } catch (e) {
    console.log(e);
    next(e)
  }
}
  
const getById =  async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await models.getContactById(contactId)
    if(contact) {
      res.status(200).json(contact)
    } else {
      res.status(404).json({message: "Contact not found"})
    }
  } catch (e) {
    console.error(e);
    next(e)
  }
}
  
const create = async (req, res, next) => {
  try {
    const contact = await models.addContact(req.body)
    res.status(201).json({ 
      message: 'new contact:',
      data: contact
    })
  } catch (e) {
    console.error(e);
    next(e);
  }
}
  
const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await models.removeContact(contactId)
    if(contact) {
      res.status(200).json({ message: 'contact deleted' })
    }
    res.status(404).json({ message: "Not found" })
  } catch (e) {
    console.error(e);
    next(e);
  }
}
  
const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await models.updateContact(contactId, req.body)
    if(contact) {
      res.status(200).json({ 
        message: 'updated contact:',
        data: contact
     })
    }
    res.status(404).json({ message: "Not found" })
  } catch (e) {
    console.error(e);
    next(e);
  }
}

module.exports = {
    get,
    getById,
    create,
    remove,
    update
}