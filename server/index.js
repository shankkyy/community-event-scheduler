const express= require('express')
const mongoose = require('mongoose')
const userRouter= require('./user/userRoutes')
const eventRouter= require('./event/eventRoutes')
const experienceRouter= require('./experiences/experienceRoutes')
const path = require('path');
const app = express();
const cors=require('cors')
require('dotenv').config()
app.use(cors())
const bodyParser = require("body-parser");
 app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.json());
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
port = process.env.PORT||5000;

    mongoose.connect(process.env.URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
    




app.use('/api/users',userRouter);
app.use('/api/events', eventRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/experiences', experienceRouter);
app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}`)
})
