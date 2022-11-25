const { Contact } = require("../models/contact.model")

const get = async (req, res, next) => {
  const contacts = await Contact.find()
  const { page, limit, favorite } = req.query;
  if(page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return res.status(200).json({ contacts: contacts.slice(startIndex, endIndex) });
  } 
  if(favorite === true) {
    return res.status(200).json({ contacts: contacts.filter(contact => contact.favorite === true) });
  }
  return res.status(200).json({ contacts });
}
  
const getById =  async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId)
  contact ? res.status(200).json({ contact }) : res.status(404).json({ message: "Not found" })
}
  
const create = async (req, res, next) => {
  if(!req.body.favorite) {
    req.body.favorite = false
  }
  const contact = await Contact.create(req.body)
  res.status(201).json({ contact })
}

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  deletedContact ? res.status(200).json({ deletedContact }) : res.status(404).json({ message: "Not Found" });
}

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  updatedContact ? res.status(200).json({ updatedContact }) : res.status(404).json({ message: 'Not found' })
}

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  updatedContact ? res.status(200).json({ updatedContact }) : res.status(404).json({ message: 'Not found' })
}

module.exports = {
    get,
    getById,
    create,
    remove,
    update,
    updateStatusContact
}