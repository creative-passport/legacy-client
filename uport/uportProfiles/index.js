const UportLite = require('uport-lite')

// UportLite is just a function returning a function. It is not a Class so don't use `new`
// Network ID: 0x4 - Rinkeby
const registry = UportLite({network_id: '0x4'})

// The MNID below is for my profile / account on uPort
registry('2p1vSdiaxxo1NmcaY2YCRPxe7Jx2JP1AYeH', (error, profile) => {
  console.log(profile)
})
