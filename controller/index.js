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
    contact ? res.status(200).json(contact) : res.status(404).json({ message: "Not found" })
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
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    deletedContact ? res.status(200).json({ deletedContact }) : res.status(404).json({ message: "Not Found" });
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    updatedContact ? res.status(200).json({ updatedContact }) : res.status(404).json({ message: 'Not found' })
  } catch (e) {
    console.error(e);
    next(e);
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    updatedContact ? res.status(200).json({ updatedContact }) : res.status(404).json({ message: 'Not found' })
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