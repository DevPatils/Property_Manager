const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userProperty: [{
        type: Schema.Types.ObjectId,
        ref: 'Property',
        default: [] // Now this will work because userProperty is an array of ObjectIds
    }]
});


const PropertySchema = new Schema({
    propertyname: {
        type: String,
        required: true
    },
    propertytype: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required : true
    },
    DOP : {
        type: Date,
        required : true
    },
    image : {
        type: String,
        required : true
    }
});



const ServiceSchema = new Schema({
    servicetype: {
        type: String,
        required: true
    },
    dateofservice: {
        type: Date,
        required: true
    },
    costofservice: {
        type: Number,
        required: true
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const User = mongoose.model('User', UserSchema);
const Property = mongoose.model('Property', PropertySchema);
const Service = mongoose.model('Service', ServiceSchema);
module.exports = {User, Property, Service};