const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const employee=new Schema({
    name: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    eid: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    card: {
        type: String
    },
})
const User = mongoose.model('User', employee);
module.exports=User;