const crypto = require('crypto');

// same MODP groups for alice, bob

// MODP 15 group
 
// shared secret of 3072 bits

// prime number: 3072 bits long:


const alice = crypto.getDiffieHellman('modp15');

// 3072 bit group has id of 15

const bob = crypto.getDiffieHellman('modp15');

// common shared secret: 
// same prime nos , same generators using modp15 group

console.log(alice.getPrime().toString('hex'));


// genearte private , public keys on respective machines
alice.generateKeys();
bob.generateKeys();

// shared secret:
const aliceSecret = alice.computeSecret(bob.getPublicKey(),null,'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(),null,'hex');

console.log(aliceSecret == bobSecret);

console.log("value of shared secret");
console.log(aliceSecret);
// console.log(bobSecret);
