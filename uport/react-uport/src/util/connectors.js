import { Connect, SimpleSigner } from 'uport-connect'

//export let uport = new Connect('TruffleBox')

//export let uport = new Connect('CaycePollard', {
//      clientId: '2ofsUiwfjUjCXANnGHS8e8vgDh3tjsxhnp7',
//      network: 'rinkeby',
//      signer: SimpleSigner('dadbcd415704c226a776390af2d86b5ff925da97545faa154482eb4a998c3414')
//    })
	
export let uport = new Connect('Wintermute', {
	      clientId: '2oyotGarK9k1RrNahydsj2AZtfzzH5zA5Mh',
	      network: 'rinkeby',
	      signer: SimpleSigner('f4bf6aedead99f7929b2ca43d94111d7e5c74bcb66c26d0b5ca53312da271d21')
	    })	
export const web3 = uport.getWeb3()
