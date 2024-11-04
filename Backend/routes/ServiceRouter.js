const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Service, Property } = require('../models/Schema.js');
const serviceRouter = Router();

serviceRouter.post('/addService', async (req, res) => {
    const { servicetype, dateofservice, costofservice, property } = req.body;
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!user) {
            return res.status(401).json({ message: 'Access Denied' });
        }

        // Check if the property exists
        const propertyExists = await Property.findById(property);
        if (!propertyExists) {
            return res.status(400).json({ message: 'Property not found' });
        }

        // Create new service record
        const service = new Service({
            servicetype,
            dateofservice,
            costofservice,
            property,
            user: user.userId
        });

        await service.save();

        res.status(201).json({ message: 'Service added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

serviceRouter.get('/allServices', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

serviceRouter.get('/getServicesByUser', async (req, res) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!user) {
            return res.status(401).json({ message: 'Access Denied' });
        }

        const services = await Service.find({ user: user.userId });
        res.status(200).json({ services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


serviceRouter.delete('/deleteService/:id', async (req, res) => {
    const { id } = req.params;
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!user) {
            return res.status(401).json({ message: 'Access Denied' });
        }
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        if (service.user.toString() !== user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await Service.findByIdAndDelete(id);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = serviceRouter;
