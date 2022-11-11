const fs = require('fs/promises')
const path = require("path")
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const getDB = async () => {
  const dbRaw = await fs.readFile(contactsPath)
  const db = JSON.parse(dbRaw)
  return db
}

const listContacts = async () => {
  const contacts = await getDB()
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await getDB()
  const contact = contacts.find(el => el.id === contactId);
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await getDB()
  const contact = contacts.find((item) => item.id === contactId)
  const filteredContacts = contacts.filter((item) => item.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts))
  return contact;
}

const addContact = async (body) => {
  const contacts = await getDB()
  const id = nanoid()
  const { name, email, phone } = body
  const contact = { id, name, email, phone }
  contacts.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contact;
}

const updateContact = async (contactId, body) => {
  const contacts = await getDB()
  const contact = contacts.find((item) => item.id === contactId)
  const updatedContact = Object.assign(contact, body)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
