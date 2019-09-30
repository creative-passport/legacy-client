var bip39 = require('bip39');
var bip32 = require('bip32');
var bitcoin = require('bitcoinjs-lib');
var path = "m/0";

// Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 128-bits of entropy
var mnemonic = bip39.generateMnemonic();
// => 'seed sock milk update focus rotate barely fade car face mechanic mercy'
console.log(mnemonic);

var seed = bip39.mnemonicToSeed(mnemonic);
console.log(seed);

var key = bip32.fromSeed(seed);
console.log(key);
console.log(key.__d);

var network = bitcoin.networks.bitcoin;
//setHdCoin(60);

var bip32RootKey = bitcoin.HDNode.fromSeedHex(seed, network);
console.log(bip32RootKey);

// Derived Keys & Root Key
//bip32RootKey = bitcoin.HDNode.fromBase58(seed, network);
var rootKey = bip32RootKey.toBase58();
console.log('RootKey: ' + rootKey);

bip32ExtendedKey = calcBip32ExtendedKey(path);
console.log(bip32ExtendedKey);

var xprvkeyB58 = "NA";
if (!bip32ExtendedKey.isNeutered()) {
    xprvkeyB58 = bip32ExtendedKey.toBase58();
}
console.log('BIP32 Extended Private Key: ' + xprvkeyB58);

var extendedPubKey = bip32ExtendedKey.neutered().toBase58();
console.log('BIP32 Extended Public Key: ' + extendedPubKey);


// Next generate an address and public / private key pair. This would be the pair that can be used to sign an ID
// The Extended keys are used to derive the following addresses.
var index = 0;
var key = "NA";
key = bip32ExtendedKey.derive(index);
var keyPair = key.keyPair;
// get Address
var address = keyPair.getAddress().toString();
console.log('Address: ' + address);

// get privkey
var hasPrivkey = !key.isNeutered();
var privkey = "NA";
if (hasPrivkey) {
    privkey = keyPair.toWIF();
}
// get pubkey
var pubkey = keyPair.getPublicKeyBuffer().toString('hex');
//var indexText = getDerivationPath() + "/" + index;

console.log('Private Key: ' + privkey);
console.log('Public Key: ' + pubkey);


function calcBip32ExtendedKey(path) {
    // Check there's a root key to derive from
    if (!bip32RootKey) {
        return bip32RootKey;
    }
    var extendedKey = bip32RootKey;
    // Derive the key from the path
    var pathBits = path.split("/");
    for (var i = 0; i < pathBits.length; i++) {
        var bit = pathBits[i];
        var index = parseInt(bit);
        if (isNaN(index)) {
            continue;
        }
        var hardened = bit[bit.length - 1] == "'";
        var isPriv = !(extendedKey.isNeutered());
        var invalidDerivationPath = hardened && !isPriv;
        if (invalidDerivationPath) {
            extendedKey = null;
        }
        else if (hardened) {
            extendedKey = extendedKey.deriveHardened(index);
        }
        else {
            extendedKey = extendedKey.derive(index);
        }
    }
    return extendedKey
}