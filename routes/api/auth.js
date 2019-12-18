const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const auth = require('../../middleware/auth');

router.post('/', (req , res) =>{
	const { password , email} = req.body

	if (!password || !email) {
			res.status(400).json({msg:"Pleas enter all fields"})
	}
	User.findOne({ email }).then( user => {
		if (!user) return res.status(400).json("User does not exists");
			
		bycrypt.compare(password ,user.password)
		.then( isMatch => {
			if(!isMatch) return res.status(400).json({msg:"Invalid user"});
			jwt.sign(
				{ id:user.id },
				config.get('jwtSecret'),
				{ expiresIn: 3600},
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
	});   
})
router.get('/user', auth, (req,res) =>{
	User.findById(req.user.id).select("-password")
	.then(user => res.json(user))
})
module.exports = router