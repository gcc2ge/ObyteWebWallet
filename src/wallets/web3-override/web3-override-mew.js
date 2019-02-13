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

      });
    },

    async sendTransaction(tx) {

      //直接发送交易

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

  client.bb.signTransaction = methodOverrides.signTransaction;

  client.bb.sendTransaction = methodOverrides.sendTransaction;
  client.bb.sendSignedTransaction = methodOverrides.sendSignedTransaction;
  return client; // needs to return wallet instance for use in vuex
}
