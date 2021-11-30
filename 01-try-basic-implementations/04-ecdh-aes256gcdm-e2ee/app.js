const crypto = require('crypto');

console.log(crypto.getCurves());
 
// secp256k1-used in bitcoin


// in this ECDH : shared secret key: 256 bits long

const alice = crypto.createECDH('secp256k1');
alice.generateKeys();

const bob = crypto.createECDH('secp256k1');
bob.generateKeys();

const alicePublicKeyBase64 = alice.getPublicKey().toString('base64')
const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64,'base64','hex');
const bobSharedKey = bob.computeSecret(alicePublicKeyBase64,'base64','hex');

const cmp = (aliceSharedKey == bobSharedKey)

console.log("bob's public key:");
console.log(alicePublicKeyBase64);

console.log("alice's public key:");
console.log(bobPublicKeyBase64);

console.log("shared key is same or not?:",cmp);
console.log("length of shared secret key:",aliceSharedKey.length*4);

// aes using generated shared key:

const aes256 = require('aes256');

//encrypt message :
const message = "this is our project implementation ideology";
console.log("message:" , message)
//sender alice:

// intialization vector: random , public,
const IV= crypto.randomBytes(16)
const cipher = crypto.createCipheriv('aes-256-gcm',Buffer.from(aliceSharedKey,'hex'),IV)
// --iv is initilazer vector: algo,cipher as buffer,IV



let encrypted = cipher.update(message,'utf8','hex')
encrypted +=cipher.final('hex');

const auth_tag = cipher.getAuthTag().toString('hex')

console.table({
	IV: IV.toString('hex'),
	encrypted:encrypted,
	auth_tag:auth_tag
});


const payload = IV.toString('hex') + encrypted + auth_tag;

const payload64 = Buffer.from(payload,'hex').toString('base64');
console.log(payload64);





//encrypted message sent through transmission media

//reciever bob:

const bobPayload = Buffer.from(payload64,'base64').toString('hex');

const bob_iv = bobPayload.substr(0,32);
const bob_encrypted = bobPayload.substr(32,bobPayload.length-32-32);
const bob_auth_tag = bobPayload.substr(bobPayload.length -32,32);

console.table(
{
	bob_iv,
	bob_encrypted,
	bob_auth_tag
});


// decryption:
try{
	const decipher = crypto.createDecipheriv(
		'aes-256-gcm',
		Buffer.from(bobSharedKey,'hex'),
		Buffer.from(bob_iv,'hex'));

		decipher.setAuthTag(Buffer.from(bob_auth_tag,'hex'))

		let decrypted = decipher.update(bob_encrypted,'hex','utf8');
		decrypted += decipher.final('utf8');

		console.log("Decrypted message:",decrypted);
}catch(err){
	console.log(err.message)
}