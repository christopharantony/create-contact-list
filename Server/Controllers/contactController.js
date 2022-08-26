const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { CreateContactService, DeleteContactService, GetAllContactService, SearchContactService, findByName, AddPhoneService, findByPhone } = require("../Services/contactServices");

const CreateContact = async (req, res) => {
    try {
        let contact;
        const { name, phone } = req.body;
        const image = req.file ? req.file.path : null;
        const contactObj = {
            name,
            phone,
            image
        }
        const samePhone = await findByPhone(phone)
        if (!samePhone) {
            const sameName = await findByName(name);
            if (sameName) {
                await AddPhoneService(name, phone)
                contact = "Phone number is added"
            } else {
                contact = await CreateContactService(contactObj)
            }
            if (contact.error) {
                return res.status(401).json({ message: 'This number is already exists' })
            }
            return res.status(200).json(contact)
        } else {
            return res.status(401).json({ message: 'This number is already exists' })
        }
    } catch (error) {
        res.status(500).json({ created: false, error: error.message })
    }
}

const AllContacts = async (req, res) => {
    try {
        const contacts = await GetAllContactService()
        const csvWriter = createCsvWriter({
            path: 'contacts.csv',
            header: [
                { id: 'name', title: 'NAME' },
                { id: 'phone', title: 'PHONE NO.' },
                { id: 'image', title: 'IMAGE LINK' }
            ]
        });
        await csvWriter.writeRecords(contacts) 
        return res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({ status: "false", message: "Could not found any contacts" })
    }
}

const UpdateContact = async (req, res) => {
    try {
        const { id } = req.query;
        const contact = await UpdateContactById(id, req.body)
        res.status(200).json({ contact, message: "Updated successfully" })
    } catch (error) {
        res.status(500).json({ status: "false", message: "Something wrong with updating" })
    }
}

const DeleteContact = async (req, res) => {
    try {
        const { id } = req.query;
        const contact = await DeleteContactService(id)
        return res.status(200).json(contact)
    } catch (error) {
        res.status(500).json({ deleted: false, error: error.message })
    }
}

const SearchContact = async (req, res) => {
    try {
        const { content } = req.query;
        const contacts = await SearchContactService(content)
        return res.status(200).json({ contacts, message: "Searching" })
    } catch (error) {
        res.status(500).json({ message: "Something wrong with search" })
    }
}

module.exports = { CreateContact, DeleteContact, AllContacts, UpdateContact, SearchContact }