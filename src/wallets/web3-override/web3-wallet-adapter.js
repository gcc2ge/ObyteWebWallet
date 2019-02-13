import * as Utils from 'bbwallet/utils';

export default class Web3WalletAdapter {
  constructor(wallet) {
    this.wallet = wallet;
    this.isHardwareWallet = this.wallet.type === 'hardware';
    this.identifier = wallet.identifier;
    this.brand = wallet.brand;
    this.length = 1;
    // Assign methods to external expected names, and bind to present context
    // this.signTransaction = this._signTransaction.bind(this);
    // this.signMessage = this._signMessage.bind(this);
  }

  // ============== (Start) EthereumJs-wallet interface methods ======================
  getPrivateKey() {
    if (this.privateKeyAvailable()) {
      return this.wallet.getPrivateKey();
    }
    return null;
  }

  getPrivateKeyString() {
    if (this.privateKeyAvailable()) {
      return this.wallet.getPrivateKeyString();
    }
    return null;
  }

  getPublicKey() {
    if (this.privateKeyAvailable()) {
      return this.wallet.getPublicKey();
    }
    return null;
  }

  getPublicKeyString() {
    if (this.privateKeyAvailable()) {
      return this.wallet.getPublicKeyString();
    }
    return null;
  }

  getAddress() {
    return this.wallet.getAddress();
  }

  getAddressString() {
    const address = this.wallet.getAddress();

    return address;
  }

  wif(){
    return Utils.Wif(this.wallet.getPrivateKey());
  }

  // ============== (End) byteball-wallet interface methods ======================
  // ============== (Start) Getters  ======================
  get privateKey() {
    if (this.privateKeyAvailable()) {
      return this.wallet.getPrivateKeyString();
    }
    return null;
  }

  get publicKey() {
    if (this.privateKeyAvailable()) {
      return this.wallet.getPublicKeyString();
    }
    return null;
  }

  get privateKeyBuffer() {
    if (this.privateKeyAvailable()) {
      return this.wallet.getPrivateKey();
    }
    return null;
  }

  get publicKeyBuffer() {
    if (this.privateKeyAvailable()) {
      return this.wallet.getPublicKey();
    }
    return null;
  }

  get accounts() {
    return {
      privateKey: this.privateKey,
      privateKeyBuffer: this.privateKeyBuffer,
      publicKey: this.publicKey,
      publicKeyBuffer: this.publicKeyBuffer,
      address: this.address
    };
  }

  get address() {
    return this.wallet.getAddressString();
  }

  get isHardware() {
    return this.isHardwareWallet;
  }

  // ============== (End) Getters  ======================
  // ============== (Start) Utility methods ======================

  async changeNetwork(network) {
    return this.wallet.changeNetwork(network);
  }

  // ============== (End) Utility methods ======================
  // ============== (Start) Operational Methods ======================


  // ============== (End) Operational Methods ======================
  // ============== (Start) Utility Methods ======================
  privateKeyAvailable() {
    return (
      this.wallet.privateKey &&
      (typeof this.wallet.privateKey !== 'undefined' &&
        this.wallet.privateKey !== null)
    );
  }
  // ============== (End) Utility Methods ======================
}
