import nodeList from '@/networks';
const state = {
  web3: {},
  client:{},
  network: {
    auth: false,
    password: '',
    port: 80,
    service: 'byteball.org/bb-test',
    type: {
      blockExplorerAddr: 'https://ropsten.etherscan.io/address/[[txHash]]',
      blockExplorerTX: 'https://ropsten.etherscan.io/tx/[[txHash]]',
      chainID: 3,
      contracts: [],
      homePage: 'https://github.com/ethereum/ropsten',
      name: 'LIVENET',
      name_long: 'livenet',
      tokens: []
    },
    url: 'https://api.myetherwallet.com/rop',
    username: ''
  },
  wallet: null,
  account: {
    balance: 0
  },
  Transactions: {},
  Networks: nodeList,
  Errors: {},
  online: true,
  customPaths: {},
  notifications: {},
  gasPrice: 41,
  ens: {}
};

export default state;
