const { Contact } = require("../models/contact.model")

const get = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
  } catch (e) {
    console.error(e);
    next(e)
  }
}
  
const getById =  async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId)
    if(contact) {
      res.status(200).json(contact)
    } else {
      res.status(404).json({ message: "Not found" })
    }
  } catch (e) {
    console.error(e);
    next(e)
  }
}
  
const create = async (req, res, next) => {
  try {
    if(!req.body.favorite) {
      req.body.favorite = false
    }
    const contact = await Contact.create(req.body)
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
    const contact = await Contact.findById(contactId)
    if(contact) {
      await Contact.findByIdAndDelete(contactId)
      res.status(200).json({ message: "contact deleted" })
    } else {
      res.status(404).json({ message: "Not found" })
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if(contact) {
      res.status(200).json({ 
        message: 'updated contact:',
        data: contact
     })
    } else {
      res.status(404).json({ message: "Not found" })
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if(contact) {
      res.status(200).json({ 
        message: 'updated contact:',
        data: contact
     })
    } else {
      res.status(404).json({ message: "Not found" })
    }
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
    update,
    updateStatusContact
}