// GenerateKeyTest.js

'use strict';
import bip39 from 'react-native-bip39'

// Generate a random mnemonic (uses react-native-randombytes under the hood), defaults to 128-bits of entropy

// NOTE: react-native-bip39's generateMnemonic in async, while original bip39's is sync
// this is due to react-native-randombytes which is forced to return natively generated 
// bytes with a callback
const generateMnemonic = async () => {
    try {
        return await bip39.generateMnemonic(256) // default to 128
    } catch (e) {
        return false
    }
}
// => 'reveal man culture nominee tag abuse keen behave refuse warfare crisp thunder valve knock unique try fold energy torch news thought access hawk table'

bip39.mnemonicToSeedHex('basket actual')
// => '5cf2d4a8b0355e90295bdfc565a022a409af063d5365bb57bf74d9528f494bfa4400f53d8349b80fdae44082d7f9541e1dba2b003bcfec9d0d53781ca676651f'

bip39.mnemonicToSeed('basket actual')
// => <Buffer 5c f2 d4 a8 b0 35 5e 90 29 5b df c5 65 a0 22 a4 09 af 06 3d 53 65 bb 57 bf 74 d9 52 8f 49 4b fa 44 00 f5 3d 83 49 b8 0f da e4 40 82 d7 f9 54 1e 1d ba 2b ...>

bip39.validateMnemonic(myMnemonic)
// => true

bip39.validateMnemonic('basket actual')
// => false