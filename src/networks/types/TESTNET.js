import tokens from '@/tokens/tokens-akroma.json';
import contracts from '@/contracts/contract-abi-akroma.json';
import aka from '@/assets/images/networks/aka.svg';
// import { EthAbi } from '../ensAbis';

export default {
  name: 'TESTNET',
  name_long: 'testnet',
  homePage: 'https://akroma.io/',
  blockExplorerTX: 'https://akroma.io/explorer/transaction/[[txHash]]',
  blockExplorerAddr: 'https://akroma.io/explorer/address/[[address]]',
  chainID: 200625,
  tokens: '',
  contracts: '',
  ensResolver: '',
  ensAbi: '',
  icon: aka
};
