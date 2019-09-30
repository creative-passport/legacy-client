/*
* Generate the root key for derived wallet (and therefore IDs)
*/

'use strict';
import './shim.js';
import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    Dimensions
} from 'react-native';

import bip32 from 'bip32';
import bip39 from 'bip39';
import bitcoin from 'react-native-bitcoinjs-lib';

export default class GenerateKey extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            path: '/m/0',
            publicKey: '',
            privateKey: '',
        }
    }
    
    onSuccess(e) {
        Linking.openURL(e.data).catch(err => console.error('An error occured', err))
    }

keyGen() {
    var path = this.path;
    // Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 128-bits of entropy
    let mnemonic = bip39.generateMnemonic();
    // => 'seed sock milk update focus rotate barely fade car face mechanic mercy'
    console.log(mnemonic);
    Alert.alert(
        'Write Down Your Key',
        mnemonic, [{
            text: 'OK',
            onPress: () => console.log('OK Pressed')
        }, ], {
            cancelable: false
        }
    );
    this.showConfirm(mnemonic);
    let seed = bip39.mnemonicToSeed(mnemonic);
    console.log(seed);

    let bip32key = bip32.fromSeed(seed);
    console.log(bip32key);
    console.log(bip32key.__d);

    let network = bitcoin.networks.bitcoin;
    //setHdCoin(60);

    let bip32RootKey = bitcoin.HDNode.fromSeedHex(seed, network);
    console.log(bip32RootKey);

    // Derived Keys & Root Key
    //bip32RootKey = bitcoin.HDNode.fromBase58(seed, network);
    let rootKey = bip32RootKey.toBase58();
    console.log("RootKey: " + rootKey);

    var bip32ExtendedKey = this.calcBip32ExtendedKey(path, bip32RootKey);
    console.log(bip32ExtendedKey);

    let xprvkeyB58 = "NA";
    if (!bip32ExtendedKey.isNeutered()) {
        xprvkeyB58 = bip32ExtendedKey.toBase58();
    }
    console.log("BIP32 Extended Private Key: " + xprvkeyB58);

    var extendedPubKey = bip32ExtendedKey.neutered().toBase58();
    console.log("BIP32 Extended Public Key: " + extendedPubKey);

    // Next generate an address and public / private key pair. This would be the pair that can be used to sign an ID
    // The Extended keys are used to derive the following addresses.
    let index = 0;
    //let key = "NA";
    let key = bip32ExtendedKey.derive(index);
    let keyPair = key.keyPair;
    // get Address
    let address = keyPair.getAddress().toString();
    console.log("Address: " + address);

    // get privkey
    let hasPrivkey = !key.isNeutered();
    let privkey = "NA";
    if (hasPrivkey) {
        privkey = keyPair.toWIF();
    }
    // get pubkey
    let pubkey = keyPair.getPublicKeyBuffer().toString("hex");
    //var indexText = getDerivationPath() + "/" + index;

    console.log("Private Key: " + privkey);
    console.log("Public Key: " + pubkey);
}

calcBip32ExtendedKey(path, bip32RootKey) {
    // Check there's a root key to derive from
    if (!bip32RootKey) {
        return bip32RootKey;
    }
    let extendedKey = bip32RootKey;
    // Derive the key from the path
    let pathBits = path.split("/");
    for (var i = 0; i < pathBits.length; i++) {
        let bit = pathBits[i];
        let index = parseInt(bit);
        if (isNaN(index)) {
            continue;
        }
        let hardened = bit[bit.length - 1] == "'";
        let isPriv = !extendedKey.isNeutered();
        let invalidDerivationPath = hardened && !isPriv;
        if (invalidDerivationPath) {
            extendedKey = null;
        } else if (hardened) {
            extendedKey = extendedKey.deriveHardened(index);
        } else {
            extendedKey = extendedKey.derive(index);
        }
    }
    return extendedKey;
}

btnClicked() {
    this.keyGen();
}

    render() {
        return ( <View style = {styles.container}>
            <Text> Generate Your ID Key </Text> 
            <TouchableHighlight style = {[styles.buttonContainer, styles.signupButton]} onPress = {() => this.btnClicked()}>
            <Text style = { styles.signUpText} > Generate </Text> 
            </TouchableHighlight>
            </View>
        );
    }
}

/*
    showConfirm(messageText) {
        const confirm = this.alertCtrl.create({
            title: "Write These Words Somewhere Safe",
            message: messageText,
            buttons: [{
                text: "Written Safely",
                handler: () => {
                    console.log("Agree clicked");
                }
            }]
        });
        confirm.present();
    }
*/


 