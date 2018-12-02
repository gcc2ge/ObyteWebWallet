import * as nodes from '../../configs/networks/types';

const derivationPaths = {
  [nodes.LIVENET.name]: "m/44'/0'",
  [nodes.TESTNET.name]: "m/44'/1'",
};

function getDerivationPath(networkName) {
  if (paths[networkName]) {
    return { dpath: paths[networkName], label: nodes[networkName].name_long };
  }
}

const paths = {};

Object.keys(derivationPaths).forEach(key => {
  paths[derivationPaths[key]] = {
    dpath: paths[key],
    label: nodes[key].name_long
  };
});

export { paths, getDerivationPath };
