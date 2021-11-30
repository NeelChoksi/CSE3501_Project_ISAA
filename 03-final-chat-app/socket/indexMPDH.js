const crypto = require("crypto");
// console.log(crypto.getCurves());


// // in this ECDH : shared secret key: 256 bits long


// const cmp = (aliceSharedKey == bobSharedKey)

// console.log("bob's public key:");
// console.log(alicePublicKeyBase64);

// console.log("alice's public key:");
// console.log(bobPublicKeyBase64);

// console.log("shared key is same or not?:",cmp);
// console.log("length of shared secret key:",aliceSharedKey.length*4);

// aes using generated shared key:

const aes256 = require('aes256');

//encrypt message :
// const message = "this is our project implementation ideology";
// console.log("message:",message)
//sender alice:
// console.log("encrypted message:",encrypted)
//encrypted message sent through transmission media

//reciever bob:

// console.log("decrypted message:",decrypted)





const io = require("socket.io")(8900,{
	cors:{
		origin:"http://192.168.0.106:3000",
	},
});

let users = [] ;

const addUser = (userId,socketId)=>{
	!users.some(user => user.userId === userId) && users.push({userId,socketId})
}

const removeUser = (socketId)=>{
	users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId)=>{
	return users.find(user=>user.userId === userId)
}

io.on("connection",(socket)=>{
	// when connected
	console.log("a user connected")
	// io.emit("welcome","socket server on port 8900.")

	// take user id and socket id from user
	socket.on("addUser",(userId) =>{
		addUser(userId,socket.id)
		io.emit("getUsers",users)
	})

	// send and get message
	socket.on("sendMessage",({senderId,receiverId,text})=>{
		const user = getUser(receiverId);
		
		const alice = crypto.getDiffieHellman('modp15');
		const receiverSocketId = user.socketId;
		alice.generateKeys();
		const alicePublicKeyBase64 = alice.getPublicKey().toString('base64')

		const bob = crypto.getDiffieHellman('modp15');
		bob.generateKeys();
		const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');



		const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64,'base64','hex');
		text = aes256.encrypt(aliceSharedKey,text);

		const bobSharedKey = bob.computeSecret(alicePublicKeyBase64,'base64','hex');
		const decrypted = aes256.decrypt(bobSharedKey,text);

		io.to(receiverSocketId).emit("getMessage",{
			senderId,
			text:decrypted,
		})


		console.log("Alice public key:",alicePublicKeyBase64)
		console.log("Bob public key:",bobPublicKeyBase64)

		console.log("Alice shared secret key:",aliceSharedKey)
		console.log("Encrypted text:",text);

		console.log("Bob Shared secret key:",bobSharedKey);
		console.log("decrypted message:",decrypted);


		
	})


	// when disconnected
	socket.on("disconnect",()=>{
		console.log(`user disconnected from socket server`)
		removeUser(socket.id)
		io.emit("getUsers",users)

	})
})

