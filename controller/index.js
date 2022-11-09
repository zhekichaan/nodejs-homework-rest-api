const models = require('../models/contacts')

const get = async (req, res, next) => {
    const contacts = await models.listContacts()
    res.status(200).json(contacts)
  }
  
const getById =  async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await models.getContactById(contactId)
    console.log(contact);
    if(contact) {
      res.status(200).json(contact)
    } else {
      res.status(404).json({message: "Contact not found"})
    }
  }
  
const create = async (req, res, next) => {
    const { name, email, phone } = req.body;
    try {
        const contact = await models.addContact({ name, email, phone })
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
    const { contactId } = req.params;
    const contact = await models.removeContact(contactId)
    if(contact === null) {
      res.status(404).json({ message: "Not found" })
    }
    res.status(200).json({ message: 'contact deleted' })
  }
  
const update = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await models.updateContact(contactId, req.body)
    console.log(contact);
    if(!contact) {
      res.status(404).json({ message: "Not found" })
    }
    res.status(200).json({ 
      message: 'updated contact:',
      data: contact
   })
}

module.exports = {
    get,
    getById,
    create,
    remove,
    update
}