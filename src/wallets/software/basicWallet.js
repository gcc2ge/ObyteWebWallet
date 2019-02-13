
import  ByteBallWallet from 'bbwallet/lib/wallet'


export default class BasicWallet {
  constructor(options) {
    this.identifier = 'Default'; // for Legacy Reasons
    this.active = false; // denotes whether the wallet was initiated with a value or not
    this.wallet = null;
    if (options) {
      this.decryptWallet(options);
    }

    // this.signTransaction = this._signTransaction.bind(this);
    // this.signMessage = this._signMessage.bind(this);

    return this;
  }

  static unlock(options) {
    return new BasicWallet(options);
  }

  // ============== (Start) EthereumJs-wallet interface methods ======================
  getPrivateKey() {
    return this.wallet.getPrivateKey();
  }

  getPrivateKeyString() {
    return this.wallet.getPrivateKeyString();
  }

  getPublicKey() {
    return this.wallet.getPublicKey();
  }

  getPublicKeyString() {
    return this.wallet.getPublicKeyString();
  }

  getAddress() {
    return this.wallet.getAddress();
  }

  getAddressString() {
    const rawAddress = '0x' + this.getAddress().toString('hex');
    return rawAddress;
  }

  // ============== (End) byteball-wallet interface methods ======================

  get privateKey() {
    return this.wallet.getPrivateKeyString();
  }

  get publicKey() {
    return this.wallet.getPublicKeyString();
  }

  get privateKeyBuffer() {
    return this.wallet.getPrivateKey();
  }

  get publicKeyBuffer() {
    return this.wallet.getPublicKey();
  }

  // ================== Start Interface Methods ========================================

  getAccounts() {
    return new Promise((resolve, reject) => {
      try {
        resolve([this.getAddressString()]);
      } catch (e) {
        reject(e);
      }
    });
  }

  getMultipleAccounts() {
    return this.getAccounts();
  }

  // ================== End Interface Methods ========================================

  detectWallet(params) {
    if (this._isJSON(params[0])) {
      return {
        type: 'fromPrivateKeyFile',
        fileContent: params[0],
        filePassword: params[1]
      };
    }
    if (params.length === 2) {
      return {
        type: 'fromMyEtherWalletKey',
        manualPrivateKey: params[0],
        privPassword: params[1]
      };
    }
    return {
      type: 'manualPrivateKey',
      manualPrivateKey: params[0]
    };
  }

  _isJSON(json) {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return false;
    }
  }

  // can be accessed via the accessWallet property of MewCore
  decryptWallet(options) {
    try {
      if (Array.isArray(options)) {
        options = this.detectWallet(options);
      }
      switch (options.type) {
        case 'manualPrivateKey': { //私钥

          this.wallet = ByteBallWallet.fromPrivateKey(options.manualPrivateKey);
          break;
        }
        case 'fromPrivateKeyFile': { // json 文件
          this.wallet = this.getWalletFromPrivKeyFile(
            options.fileContent,
            options.filePassword
          );
          break;
        }
        default: {
          break;
        }
      }
      this.active = true;
    } catch (e) {
      throw e;
    }

    if (this.wallet !== null) {
      this.wallet.type = 'default';
    }
  }

  static generateWallet() {
    // eslint-disable-next-line new-cap
    const tempWallet = Wallet.generate();
    const privKey = tempWallet.getPrivateKeyString();

    return new BasicWallet({
      type: 'manualPrivateKey',
      manualPrivateKey: privKey
    });
  }


}
