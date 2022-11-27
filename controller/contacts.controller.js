const { Contact } = require("../models/contact.model")

const get = async (req, res, next) => {
  const { page, limit, favorite } = req.query;
  const contacts = favorite ? await Contact.find({ favorite: true }).limit(limit * 1).skip((page-1) * limit) : await Contact.find().limit(limit * 1).skip((page-1) * limit)
  return res.status(200).json({ contacts });
}
  
const getById =  async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  contact ? res.status(200).json({ contact }) : res.status(404).json({ message: "Not found" });
}
  
const create = async (req, res, next) => {
  const { user } = req;
  const owner = user._id;
  const { name, email, phone, favorite } = req.body;
  if(!req.body.favorite) {
    req.body.favorite = false;
  }
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
    owner
  });
  const result = await contact.save();
  res.status(201).json({ result });
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