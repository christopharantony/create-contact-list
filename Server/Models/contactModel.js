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
        type: String,
        required: true,
        default: 
            "https://www.w3schools.com/howto/img_avatar.png"
    }
},{ timestamps:true });

module.exports = mongoose.model("Contact",contactSchema);