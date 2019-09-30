const UportLite = require('uport-lite')

//import {UportLite} from 'uport-lite'

// UportLite is just a function returning a function. It is not a Class so dont use 'new'
const registry = UportLite();

// Checking Registry
registry('2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', (error, profile) => {
	console.log(profile);
});








