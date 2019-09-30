import { Connect, SimpleSigner } from 'uport-connect'

//export let uport = new Connect('TruffleBox')

export let uport = new Connect('Hubertus', {
      clientId: '2ofRBEk4ai8yFWknLxDDAnMDP8LDFWKTCH2',
      network: 'rinkeby',
      signer: SimpleSigner('4b070112a66e9ee6b341e60e7c5939e8ec36d12463abaadb565bed700361172e')
    })
export const web3 = uport.getWeb3()
