const { Router } = require('express');
const Propertyrouter = Router();
const jwt = require('jsonwebtoken');
const { Property, User } = require('../models/Schema.js');


Propertyrouter.post('/addproperty', async (req, res) => {
    const { propertyname, propertytype, address, DOP, image } = req.body;
    const token = req.header('auth-token');
    console.log(token);
    console.log(process.env.JWT_SECRET);
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userid = user.userId;
    if (!user) {
        return res.status(401).json({ error: "Invalid Token" });
    }


    if (!propertyname || !propertytype || !address || !DOP || !image) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const newproperty = new Property({ propertyname, propertytype, address, DOP, image });
    try {
        await newproperty.save();
        const updatedUser = await User.findByIdAndUpdate(userid, { $push: { userProperty: newproperty._id } });
        console.log(updatedUser);
        res.status(200).json({ message: "Property added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

Propertyrouter.get('/allproperties', async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json({ properties });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


Propertyrouter.get('/getpropertybyUser', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userid = user.userId;
    if (!user) {
        return res.status(401).json({ error: "Invalid Token" });
    }
    try {
        const userProperty = await User.findById(userid).populate('userProperty');
        res.status(200).json( userProperty.userProperty );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

Propertyrouter.delete('/deleteproperty/:id', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userid = user.userId;
    if (!user) {
        return res.status(401).json({ error: "Invalid Token" });
    }
    const propertyid = req.params.id;
    try {
        const property = await Property.findById(propertyid);
        if (property) {
            await Property.findByIdAndDelete(propertyid);
            const updatedUser = await User.findByIdAndUpdate(userid, { $pull: { userProperty: propertyid } });
            res.status(200).json({ message: "Property deleted successfully" });
        } else {
            res.status(404).json({ error: "Property not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = Propertyrouter;