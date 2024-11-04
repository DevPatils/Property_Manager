const express = require('express');
const connectDB = require('./db/db');
const dotenv = require('dotenv');
const cors = require('cors');
const Userrouter = require('./routes/Userrouter');
const Propertyrouter = require('./routes/Propertyrouter');

const app = express();
dotenv.config();

connectDB();

app.use(express.json());

app.use(cors());

app.use('/user', Userrouter);
app.use('/property', Propertyrouter);
app.get('/', (req, res) => {

    res.send('Server is running');
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

