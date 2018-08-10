var bitcoin = require('bitcoinjs-lib');

const alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
const txb = new bitcoin.TransactionBuilder();

txb.setVersion(1);
txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0);
txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000);

txb.sign(0, alice);

console.log(txb.build().toHex());
document.querySelector('#app').innerHTML = txb.build().toHex();