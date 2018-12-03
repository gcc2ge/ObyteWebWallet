import nodeList from '@/networks';
const state = {
  // web3: {},
  client:{},
  network: {
    auth: false,
    password: '',
    port: 80,
    service: 'byteball.org/bb',
    type: {
      blockExplorerAddr: 'https://explorer.byteball.org/#[[address]]',
      blockExplorerTX: 'https://explorer.byteball.org/#[[txHash]]',
      chainID: 0,
      contracts: [],
      homePage: 'https://explorer.byteball.org/',
      name: 'LIVENET',
      name_long: 'livenet',
      tokens: []
    },
    url: 'wss://byteball.org/bb',
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
  // gasPrice: 41,
  // ens: {}
};

export default state;
