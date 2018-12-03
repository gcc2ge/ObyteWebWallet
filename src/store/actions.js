import {override, WalletWrapper} from '@/wallets';
import url from 'url';
import web3 from 'web3';
import byteball from 'byteball';

const addNotification = function ({commit, state}, val) {
  const address = web3.utils.toChecksumAddress(val[0]);
  const newNotif = {};
  Object.keys(state.notifications).forEach(item => {
    newNotif[item] = state.notifications[item];
  });

  if (!Array.isArray(newNotif[address])) newNotif[address] = [];

  newNotif[address].push({
    title: val[2],
    read: false,
    timestamp: new Date(),
    body: val[1].hasOwnProperty('message') ? val[1].message : val[1],
    expanded: false
  });

  commit('ADD_NOTIFICATION', newNotif);
};

const addCustomPath = function ({commit, state}, val) {
  const newPaths = {...state.customPaths};
  newPaths[val.dpath] = {label: val.label, dpath: val.dpath};
  commit('ADD_CUSTOM_PATH', newPaths);
};

const checkIfOnline = function ({commit}) {
  commit('CHECK_IF_ONLINE');
};

const clearWallet = function ({commit, state}) {
  if (state.wallet.identifier === 'MEWconnect') {
    state.wallet.wallet.mewConnectDisconnect();
  }
  commit('CLEAR_WALLET');
};

const createAndSignTx = function ({commit}, val) {
  commit('CREATE_AND_SIGN_TX', val);
};

const decryptWallet = function ({commit, state, dispatch}, wallet) {
  const wrappedWallet = new WalletWrapper(wallet);
  const _client = state.client;
  override(_client, wrappedWallet, this._vm.$eventHub, { state, dispatch });
  commit('DECRYPT_WALLET', wrappedWallet);
  commit('SET_CLIENT_INSTANCE', _client);
};

const setAccountBalance = function ({commit}, balance) {
  commit('SET_ACCOUNT_BALANCE', +balance);
};

const setGasPrice = function ({commit}, gasPrice) {
  commit('SET_GAS_PRICE', gasPrice);
};

const setWeb3Wallet = function ({commit}, wallet) {
  commit('SET_WEB3_PROVIDER_WALLET', wallet);
};

const setState = function ({commit}, stateObj) {
  commit('INIT_STATES', stateObj);
};

const setClientInstance = function ({dispatch, commit, state}, provider) {
  const hostUrl = url.parse(state.network.url);
  const client = new byteball.Client(
    `${hostUrl.protocol}//${hostUrl.hostname}${
      hostUrl.pathname
      }`, true);

  commit(
    'SET_CLIENT_INSTANCE',
    override(client, state.wallet, this._vm.$eventHub, {
      state,
      dispatch
    })
  );
  /*if (provider && provider.currentProvider) {
    commit(
      'SET_WEB3_INSTANCE',
      override(
        new web3(provider.currentProvider),
        state.wallet,
        this._vm.$eventHub,
        {state, dispatch}
      )
    );
  } else {
    const hostUrl = url.parse(state.network.url);
    const web3Instance = new byteball.Client(
      `${hostUrl.protocol}//${hostUrl.hostname}${
        hostUrl.pathname
        }`, true);

    commit(
      'SET_WEB3_INSTANCE',
      override(web3Instance, state.wallet, this._vm.$eventHub, {
        state,
        dispatch
      })
    );
  }*/
};

const switchNetwork = function ({commit}, networkObj) {
  // check if wallet is hardware.  if true, check if it supports this network. if not, do nothing
  commit('SWITCH_NETWORK', networkObj);
};
/*const setENS = function ({commit}, ens) {
  commit('SET_ENS', ens);
};*/

const updateNotification = function ({commit, state}, val) {
  // address, index, object
  const address = web3.utils.toChecksumAddress(val[0]);
  const newNotif = {};
  Object.keys(state.notifications).forEach(item => {
    newNotif[item] = state.notifications[item];
  });

  newNotif[address][val[1]] = val[2];
  commit('UPDATE_NOTIFICATION', newNotif);
};

export default {
  addNotification,
  addCustomPath,
  checkIfOnline,
  clearWallet,
  createAndSignTx,
  decryptWallet,
  setAccountBalance,
  setGasPrice,
  setWeb3Wallet,
  setState,
  // setENS,
  setClientInstance,
  switchNetwork,
  updateNotification
};
