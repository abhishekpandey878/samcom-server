const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    validate: value => {
        if (!validator.isEmail(value)) {
            throw new Error({error: 'Invalid Email address'})
        }
    }
},
designation: {
    type: String,
    require: true,
},
gender: {
    type: String,
    require: true,
},
});

module.exports = Employee = mongoose.model('Employee', employeeSchema);