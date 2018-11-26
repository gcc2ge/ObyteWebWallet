import { Wallet, Configs } from '@/helpers';

function create(password) {
  const createdWallet = {};
  const wallet =  Wallet.generate();
  createdWallet.walletJson = wallet.export(password);
  createdWallet.name = wallet.getV3Filename();
  return createdWallet;
}

onmessage = function(event) {
  if (event.data.type === 'createWallet') {
    const workerResult = create(event.data.data[0]);
    postMessage(workerResult);
  }
};
