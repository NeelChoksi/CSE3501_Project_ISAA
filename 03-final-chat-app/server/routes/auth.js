const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req,res)=>{
	const {username,email,password} = req.body;
	// take info from client side 
	try{
		//generate hashed password with salt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password,salt);

		//create new user
		const newUser = new User({
			username,
			email,
			password:hashedPassword
		})

		//save user into database , return response
		const user =await newUser.save();
		res.status(200).json(user);

	}catch(err){
		res.status(500).json(err)
	}
})


//login
router.post("/login",async(req,res)=>{
	
	const {email,password} = req.body;
	
	try{
		const user = await User.findOne({email});
		!user && res.status(404).json("user not found");

		const validPassword = await bcrypt.compare(password,user.password);
		!validPassword && res.status(400).json("Incorrect credentials");

		res.status(200).json(user);


	}catch(err){
		res.status(500).json(err)
	}



})


module.exports = router;