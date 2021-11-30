const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// update user 
router.put("/:id", async(req,res)=>{
	if(req.body.userId === req.params.id || req.body.isAdmin){
		if(req.body.password){
			try{
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password,salt);
			}catch(err){
				return res.status(500).json(arr)
			}
		}

		try{
			const user = await User.findByIdAndUpdate(req.params.id,{
				$set:req.body
			});
			res.status(200).json("Account Updated!")
		}catch(err){
			return res.status(500).json(err)
		}

	}else{
		return res.status(403).json("update only your account")
	}
})
// delete user
router.delete("/:id", async(req,res)=>{
	if(req.body.userId === req.params.id || req.body.isAdmin){
		
		try{
			const user = await User.findByIdAndDelete(req.params.id);
			res.status(200).json("Account Deleted!")
		}catch(err){
			return res.status(500).json(err)
		}

	}else{
		return res.status(403).json("You can delete only your account")
	}
})
// get a user
router.get("/",async(req,res)=>{
	
	const userId = req.query.userId;
	const username = req.query.username;

	try{
		const user = userId ? await User.findById(userId) : await User.findOne({username:username});
		!user &&  res.status(404).json("cannot find user")
		const {password,updatedAt,...other} = user._doc
		res.status(200).json(other);

	}catch(err){
		return res.status(500).json(err)
	}

})
// get friends 
router.get("/friends/:userId",async(req,res)=>{
	try{
		const user = await User.findById(req.params.userId);
		const friends = await Promise.all(
			user.followings.map(friendId =>{
				return User.findById(friendId)
			})
		)
		let friendList = [] ;
		friends.map(friend=>{
			const {_id,username,profilePicture} = friend;
			friendList.push({_id,username,profilePicture})
		});
		res.status(200).json(friendList)

	}catch(err){
		res.status(500).json(err)
	}
})

// follow a user
router.put("/:id/follow",async(req,res)=>{
	if(req.body.userId !== req.params.id){
		try{
			const user = await User.findById(req.params.id);
			const currUser = await User.findById(req.body.userId);
			if(!user.followers.includes(req.body.userId)){
				await user.updateOne({$push:{followers:req.body.userId}});
				await currUser.updateOne({$push:{followings:req.params.id}});
				res.status(200).json(`You are now following ${user.username}`)
			}else{
				res.status(403).json(`you already follow ${user.username}`)
			}
		}catch(err){
			return res.status(500).json(err)
		}
	}else{
		res.status(403).json("you cannot follow yourself")
	}
})
// unfollow a user
router.put("/:id/unfollow",async(req,res)=>{
	if(req.body.userId !== req.params.id){
		try{
			const user = await User.findById(req.params.id);
			const currUser = await User.findById(req.body.userId);
			if(user.followers.includes(req.body.userId)){
				await user.updateOne({$pull:{followers:req.body.userId}});
				await currUser.updateOne({$pull:{followings:req.params.id}});
				res.status(200).json(`You have unfollowed ${user.username}`)
			}else{
				res.status(403).json(`You do not follow ${user.username}`)
			}
		}catch(err){
			return res.status(500).json(err)
		}
	}else{
		res.status(403).json("you cannot unfollow yourself")
	}
})

module.exports = router;