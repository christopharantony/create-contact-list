const contactDb = require('../Models/contactModel')

const handleErrors = (err) => {
    if (err.message.includes('E11000 duplicate key error collection: create-contact.contacts index: phone_1 dup')) {
        return { error: "Mobile number is already exists" }
    }
}

const findByName = async (name) => {
    const contacts = await contactDb.find({name});
    return contacts.length
}

const findByPhone = async (phone) => {
    const contacts = await contactDb.find({phone});
    return contacts.length
}
const CreateContactService = async (obj) => {
    try {
        const post = await contactDb.create(obj);
        return post;
    } catch (error) {
        const Error = handleErrors(error)
        return Error
    }
}

const AddPhoneService = async (name,phone) => {
    try {
        const post = await contactDb.updateOne(
            {
                name
            },
            {
                $push: {
                    phone
                }
            }
        );
        return post;
    } catch (error) {
        const Error = handleErrors(error)
        return Error
    }
}

const DeleteContactService = async (id) => {
    try {
        const contact = await contactDb.findByIdAndDelete(id)
        return contact;
    } catch (error) {
        console.log(error)
    }
}

const GetAllContactService = async () => {
    try {
        const contacts = await contactDb.find()
        return contacts;
    } catch (error) {
        console.log(error)
    }
}

const UpdateContactById = async (id, body) => {
    const contact = await contactDb.findByIdAndUpdate(id, body)
    return contact;
}

const SearchContactService = async (content) => {
    const contacts = await contactDb.find(
        {
            $or: [
                {
                    name: new RegExp(content, "i")
                },
                {
                    phone: new RegExp(content, "i")
                }
            ]
        }
    )
    return contacts;
}

module.exports = { CreateContactService, DeleteContactService, GetAllContactService, UpdateContactById, SearchContactService, findByName, findByPhone, AddPhoneService }