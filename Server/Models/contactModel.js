const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type:[String],
        required: true,
        unique: true
    },
    image: {
        type: String
    }
},{ timestamps:true });

module.exports = mongoose.model("Contact",contactSchema);