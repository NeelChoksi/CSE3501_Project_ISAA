// const crypto = require("crypto");
// console.log(crypto.getCurves());

const { generateKeyPairSync } = require('crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048, // the length of your key in bits
  publicKeyEncoding: {
    type: 'spki', // recommended to be 'spki' by the Node.js docs
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
    format: 'pem',
  },
});

// console.log(publicKey);
// console.log(privateKey);

// // in this ECDH : shared secret key: 256 bits long


const {  publicEncrypt, privateDecrypt } = require('crypto');
// const { publicKey, privateKey } = require('./keypair');


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
		
		
		const receiverSocketId = user.socketId;
	

		const encryptedData = publicEncrypt(
		    publicKey,
		    Buffer.from(text)
		);


		const decryptedData = privateDecrypt(
		    privateKey,
		    encryptedData
		);



		io.to(receiverSocketId).emit("getMessage",{
			senderId,
			text:decryptedData,
		})


	
		console.log("Encrypted data:",encryptedData.toString('hex'))

		console.log("Decrypted data:",decryptedData.toString('utf-8'));


		
	})


	// when disconnected
	socket.on("disconnect",()=>{
		console.log(`user disconnected from socket server`)
		removeUser(socket.id)
		io.emit("getUsers",users)

	})
})

