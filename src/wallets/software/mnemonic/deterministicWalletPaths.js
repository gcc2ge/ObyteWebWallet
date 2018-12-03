import * as nodes from '../../../networks/types';
import derivationPaths from './derivationPaths';
import store from 'store';

function getDerivationPath(networkName) {
  if (!networkName) {
    if (store.get('network') !== undefined) {
      networkName = store.get('network').type.name;
    }
  }

  if (paths[derivationPaths[networkName]]) {
    return {
      dpath: derivationPaths[networkName],
      label: nodes[networkName].name_long
    };
  }
  return {
    dpath: derivationPaths[nodes.LIVENET.name],
    label: nodes[nodes.LIVENET.name].name_long
  };
}

function buildPathsObject() {
  const paths = {};

  Object.keys(derivationPaths).forEach(key => {
    paths[derivationPaths[key]] = {
      dpath: derivationPaths[key],
      label: nodes[key].name_long
    };
  });
  return paths;
}

const paths = buildPathsObject();

export { paths, getDerivationPath };
