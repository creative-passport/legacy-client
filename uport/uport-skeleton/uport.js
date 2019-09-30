const uportConnect = require('uport-connect');
const qrcode = require('qrcode-terminal');

//const mnidAddress = '2ofsUiwfjUjCXANnGHS8e8vgDh3tjsxhnp7';
//const signingKey = 'dadbcd415704c226a776390af2d86b5ff925da97545faa154482eb4a998c3414';
//const appName = 'CaycePollard';

const mnidAddress = '2oyotGarK9k1RrNahydsj2AZtfzzH5zA5Mh';
const signingKey = 'f4bf6aedead99f7929b2ca43d94111d7e5c74bcb66c26d0b5ca53312da271d21';
const appName = 'Wintermute';

const uriHandler = (uri) => {
	qrcode.generate(uri, {small: true})
	console.log(uri)
}

const uport = new uportConnect.Connect(appName, {uriHandler, 
	clientId: mnidAddress,
	network: 'rinkeby',
	signer: uportConnect.SimpleSigner(signingKey)
});

// Request credentials
uport.requestCredentials({
	requested: ['name', 'avatar', 'phone', 'country'],
	notification: true
}).then((credentials) => {
	console.log(credentials);
	
	//console.log('App address: ' + credentials.address);
	
	
	//uport.attestCredentials({
	//	sub: credentials.address, 
	//	claims: {MyceliaMember: true}
	//}).then(attestation => {
		// send attestation to user
	//	uport.showRequest(attestation);
	//	console.log(attestation);
	//});
	// Attest New Credential
	//uport.attestCredentials({
	//	sub: credentials.address,
	//	claim: { TestClaim: 'True'}
	//})
	
	
	console.log('++++++++++++++++++ Request Address +++++++++++++++++++++');
	uport.requestAddress().then((address) => {
		console.log(address);
		
		// Attest A Credential
		uport.attestCredentials({
			sub: address,
			claim: { MyceliaMember: 'Yes'}
		}).then((attestation) => {
			console.log('Attestation: ' + attestation);
		});
	});
});








