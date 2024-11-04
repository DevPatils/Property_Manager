const { Router } = require('express');
const {User}=require('../models/Schema.js');
const zod=require('zod');
const jwt = require('jsonwebtoken');
const Userrouter = Router();
const registerSchema=zod.object({
    name:zod.string().nonempty(),
    email:zod.string().email(),
    password:zod.string().min(6)
});
const loginSchema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
});


Userrouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const {error}=registerSchema.safeParse(req.body);

    if(error){
        return res.status(400).json({error:error.errors.message});
    }
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // const user = new User({ name, email, password });
    const existinguser=await User.findOne({email:email});
    if(existinguser){
        return res.status(400).json({error:"User with this email already exists"});
    }
    try {
        const newuser = new User({username: name, email, password });
        await newuser.save();
        const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: "User registered successfully", token });   
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

Userrouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const {error}=loginSchema.safeParse(req.body);
    if(error){
        return res.status(400).json({error:error.errors});
    }
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    if (user.password !== password) {
        return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "User logged in successfully", token });
});



Userrouter.get('/', async (req, res) => {
    console.log(
        "GET request to the homepage"
    )
    res.send("GET request to the homepage")
})

module.exports = Userrouter;
