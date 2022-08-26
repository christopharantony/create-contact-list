const route = require('express').Router();
const { CreateContact, DeleteContact, AllContacts, UpdateContact, SearchContact } = require('../Controllers/contactController');
const upload = require('../Utils/cloudinary')

route.post('/create',upload.single("image"), CreateContact)
route.get('/', AllContacts)
route.put('/update', UpdateContact)
route.delete("/delete", DeleteContact)
route.get('/search', SearchContact)

module.exports = route;