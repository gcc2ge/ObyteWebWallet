import * as nodes from '../../../networks/types';

const derivationPaths = {
  [nodes.LIVENET.name]: "m/44'/0'",
  [nodes.TESTNET.name]: "m/44'/1'",
};

export default derivationPaths;
