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

