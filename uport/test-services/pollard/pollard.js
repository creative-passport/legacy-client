const uportConnect = require('uport-connect');
const qrcode = require('qrcode-terminal');

//const mnidAddress = '2ofsUiwfjUjCXANnGHS8e8vgDh3tjsxhnp7';
//const signingKey = 'dadbcd415704c226a776390af2d86b5ff925da97545faa154482eb4a998c3414';
//const appName = 'CaycePollard';

const mnidAddress = '2ozTKuaxJCb42KiuEavvRWwDo58wgXfh2QG';
const signingKey = '9eeebb05d9e5da60d1dbe2b93b20b3d0aeacc05df4485a70bea93e4d43c8016b';
const appName = 'Pollard';

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
	requested: ['name', 'avatar', 'phone', 'country', 'MyceliaMember'],
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
	
	
	//console.log('++++++++++++++++++ Request Address +++++++++++++++++++++');
	//uport.requestAddress().then((address) => {
	//	console.log(address);
		
		// Attest A Credential
	//	uport.attestCredentials({
	//		sub: address,
	//		claim: { MyceliaMember: 'Yes'}
	//	}).then((attestation) => {
	//		console.log('Attestation: ' + attestation);
	//	});
	//});
});
