const express = require('express');
const fileUpload =  require('express-fileupload')
const mongoose = require("mongoose");
const config = require("config")
const app = express();

app.use(express.json());
app.use(fileUpload());
          
const db = config.get("mongoURI") 

mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true , useCreateIndex:true })
.then( () => console.log("MongoDB connected..."))
.catch(err => console.log(err));

app.use('/api/items', require('./routes/api/items'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))


const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`app listen port ${port}`))