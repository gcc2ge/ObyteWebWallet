import * as unit from 'ethjs-unit';

export default function web3OverrideMew(client,
                                        wallet,
                                        eventHub,
                                        {state, dispatch}) {
  if (!wallet) return client;

  const methodOverrides = {
    signTransaction(tx) {
      return new Promise(resolve => {
        eventHub.$emit(
          'showTxConfirmModal',
          tx,
          wallet.isHardware,
          // wallet.signTransaction.bind(this),
          function (tx) {
            return new Promise((resolve, reject) => {
              // console.info(wallet.wif())
              client.compose.payment(tx, wallet.wif(), function (err, result) {
                if (err) reject(err);
                resolve({
                  rawTransaction: JSON.stringify(result)
                });
              });
            });
          },
          res => {
            resolve(res);
          }
        );
        /*if (tx.generateOnly) {
          delete tx['generateOnly'];
          eventHub.$emit(
            'showTxConfirmModal',
            tx,
            wallet.isHardware,
            wallet.signTransaction.bind(this),
            res => {
              resolve(res);
            }
          );
        } else if (tx.web3WalletOnly) {
          delete tx['web3WalletOnly'];
          eventHub.$emit(
            'showWeb3Wallet',
            tx,
            wallet.isHardware,
            // This just sends the tx. Metamask doesn't support signing https://github.com/MetaMask/metamask-extension/issues/3475
            wallet.signTransaction.bind(this),
            res => {
              resolve(res);
            }
          );
        } else {
          eventHub.$emit(
            'showTxConfirmModal',
            tx,
            wallet.isHardware,
            // wallet.signTransaction.bind(this),
            function (tx) {
              return new Promise((resolve, reject) => {
                client.compose.payment(tx, "9386coYjDwLDGc8eEZiVLdieJtXdYwMRutqPcuJSQFBDSh8c75G", function (err, result) {
                  if (err) reject(err);
                  resolve(JSON.stringify(result));
                });
              });
            },
            res => {
              resolve(res);
            }
          );
        }*/
      });
    },
    /*signMessage(message) {
      return new Promise(resolve => {
        eventHub.$emit(
          'showMessageConfirmModal',
          message,
          wallet.isHardware,
          wallet.signMessage,
          res => {
            resolve(res);
          }
        );
      });
    },*/
    async sendTransaction(tx) {

      //直接发送交易

      /*const localTx = Object.assign({}, tx);
      delete localTx['gas'];
      delete localTx['nonce'];

      tx.nonce = !tx.nonce
        ? await web3.eth.getTransactionCount(wallet.getAddressString())
        : tx.nonce;
      tx.gas = !tx.gas ? await web3.eth.estimateGas(localTx) : tx.gas;
      tx.chainId = !tx.chainId ? state.network.type.chainID : tx.chainId;
      tx.gasPrice = !tx.gasPrice
        ? unit.toWei(state.gasPrice, 'gwei').toString()
        : tx.gasPrice;
      if (state.wallet.identifier === 'Web3') tx.web3WalletOnly = true;
      web3.eth
        .sendTransaction_(tx)
        .once('transactionHash', hash => {
          dispatch('addNotification', [tx.from, hash, 'Transaction Hash']);
        })
        .on('receipt', res => {
          dispatch('addNotification', [tx.from, res, 'Transaction Receipt']);
        })
        .on('error', err => {
          dispatch('addNotification', [tx.from, err, 'Transaction Error']);
        });*/
    },
    async sendSignedTransaction(signedTx) {
      return new Promise((resolve, reject) => {
        signedTx = JSON.parse(signedTx);
        // console.info(`${typeof signedTx} ${signedTx}`)
        const params = {
          unit: signedTx
        };
        var hash =state.network.type.blockExplorerTX.replace("[[txHash]]",signedTx.unit);

        var to=signedTx.messages[0].payload.outputs[0].address;
        var amount=signedTx.messages[0].payload.outputs[0].amount;
        // var title=`title`;
        var to =to;
        var amount = amount;

        client.api.postJoint(params, function(err, result) {
          if (err) console.info(err)
          dispatch('addNotification', [wallet.getAddressString(), hash, to, amount]);
          resolve();
          // console.log(result);
        })

      });
    }
  };
  client.bb = {};
  client.defaultAccount = wallet.getAddressString().toLowerCase();
  client.bb.defaultAccount = wallet.getAddressString().toLowerCase();
  client.bb.isAddress = function (address) {
    return new Promise((resolve, reject) => {
      client.api.getDefinition(address, function (err, result) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  };
  client.bb.getBalance = function (address) {
    var arr = [address];
    return new Promise((resolve, reject) => {
      client.api.getBalances(arr, function (err, result) {
        if (err || result == {}) {
          resolve(0)
        }
        else {
          var balance = result[address].base.stable;
          resolve(balance);
        }
      });
    });
  };
  // web3.eth.sendTransaction.method.accounts = {
  //   wallet: {
  //     length: 1,
  //     [wallet.getAddressString().toLowerCase()]: {
  //       privateKey: true
  //     }
  //   },
  //   ...methodOverrides
  // };

  client.bb.signTransaction = methodOverrides.signTransaction;
  // web3.eth.sign = methodOverrides.signMessage;
  // web3.eth.sendTransaction_ = web3.eth.sendTransaction;
  client.bb.sendTransaction = methodOverrides.sendTransaction;
  client.bb.sendSignedTransaction = methodOverrides.sendSignedTransaction;
  return client; // needs to return web3 for use in vuex
}
