const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');



router.post('/', (req , res) =>{
    const { name , password , email} = req.body

    if (!name || !password || !email) {
        res.status(400).json({msg:"Pleas enter all fields"})
    }
    User.findOne({ email }).then( user => {
        if (user) return res.status(400).json({msg:"User already exists"})
    });

    const newUser = new User ({
        name,
        email,
        password
    })
    bycrypt.genSalt(10 , (err , salt) => {
        bycrypt.hash(newUser.password , salt , (err , hash) => {
            if(err) throw err;  
            newUser.password = hash;
            newUser.save().then( user => {
                jwt.sign(
                    { id:user.id },
                    config.get('jwtSecret'), 
                    { expiresIn: 3600 },
                    (err ,token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
               
            })
        })
    })
})

module.exports = router