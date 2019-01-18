<template>
  <div
    v-if="$store.state.wallet !== null"
    class="send-eth-and-tokens">
    <div class="wrap">
      <div class="side-nav">
        <interface-side-menu/>
      </div>
      <div class="contents">
        <div class="tx-contents">
          <div>
            <interface-address :address="address"/>
          </div>
          <div>
            <interface-balance :balance="balance"/>
          </div>
          <div>
            <interface-network :block-number="blockNumber"/>
          </div>
          <router-view
            :tokens-with-balance="tokensWithBalance"
            :get-balance="getBalance"/>
          <!--<div
            v-if="$store.state.online"
            class="tokens">
            <interface-tokens
              :get-token-balance="getTokenBalance"
              :tokens="tokens"
              :received-tokens="receivedTokens"/>
          </div>-->
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <wallet-not-found-container/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {parseTokensHex} from '@/helpers';
  import ENS from 'ethereum-ens';
  import Utils from 'bitcore-wallet-client/lib/common/utils'

  import WalletNotFoundContainer from './containers/WalletNotFoundContainer';

  import InterfaceAddress from './components/InterfaceAddress';
  import InterfaceBalance from './components/InterfaceBalance';
  import InterfaceNetwork from './components/InterfaceNetwork';
  import InterfaceSideMenu from './components/InterfaceSideMenu';
  import InterfaceTokens from './components/InterfaceTokens';
  import {Web3Wallet} from '@/wallets/software';
  import * as networkTypes from '@/networks/types';
  import {BigNumber} from 'bignumber.js';
  import store from 'store';

  export default {
    components: {
      'interface-side-menu': InterfaceSideMenu,
      'interface-address': InterfaceAddress,
      'interface-balance': InterfaceBalance,
      'interface-network': InterfaceNetwork,
      'interface-tokens': InterfaceTokens,
      'wallet-not-found-container': WalletNotFoundContainer
    },
    data() {
      return {
        balance: '0',
        blockNumber: 0,
        tokens: [],
        receivedTokens: false,
        tokensWithBalance: [],
        pollNetwork: () => {
        },
        pollBalance: () => {

        },
        pollBlock: () => {
        },
        pollAddress: () => {
        }
      };
    },
    computed: {
      address() {
        if (this.wallet !== null) {
          return this.wallet.getAddressString();
        }
      },
      ...mapGetters({
        network: 'network',
        wallet: 'wallet'
      })
    },
    watch: {
      network() {
        this.setupOnlineEnvironment();
      },
      address() {
        this.setupOnlineEnvironment();
      }
    },
    mounted() {
      this.setupOnlineEnvironment();
    },
    destroyed() {
      this.clearIntervals();
    },
    methods: {
      getBlock() {
        const client = this.$store.state.client;
        var self=this;
        client.api.getLastMci(function(err, result) {
          self.blockNumber = result;
        });
        /*this.$store.state.web3.eth
          .getBlockNumber()
          .then(res => {
            this.blockNumber = res;
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.error(err);
          });*/
      },
      getBalance() {
        const client = this.$store.state.client;
        var self=this;
        const address=this.address;
        var arr=[address];

        client.api.getBalances(arr, function (err, result) {
//          console.info(`err ${JSON.stringify(err)}`)
//          console.info(`result ${JSON.stringify(result)}`)
          if (result){
            self.balance = Utils.formatAmount(result[address].base.stable,"mega");
            self.$store.dispatch('setAccountBalance', self.balance);
          }else{
            self.balance = self.$store.state.account.balance;
//            console.info(`error ${JSON.stringify(err)}`);
          }
//          if (err != {} && err != null) {
//            self.balance=undefined;
//            console.info(`error ${JSON.stringify(err)}`);
//          } else if (!result) {
//            self.balance=0;
//          } else{
//            self.balance = Utils.formatAmount(result[address].base.stable,"mega");
//            this.$store.dispatch('setAccountBalance', self.balance);
//          }
        });
        /*const web3 = this.$store.state.web3;
        web3.eth
          .getBalance(this.address)
          .then(res => {
            this.balance = web3.utils.fromWei(res, 'ether');
            this.$store.dispatch('setAccountBalance', this.balance);
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.error(err);
          });*/
      },
      /*checkWeb3WalletAddrChange() {
        this.pollAddress = setInterval(() => {
          window.web3.eth.getAccounts((err, accounts) => {
            if (err) {
              // eslint-disable-next-line no-console
              console.error(err);
              return;
            }
            if (!accounts.length) {
              // eslint-disable-next-line no-console
              console.error('Please unlock metamask');
              return;
            }
            const address = accounts[0];
            if (
              this.wallet !== null &&
              address !== this.wallet.getAddressString()
            ) {
              const wallet = new Web3Wallet(address);
              this.$store.dispatch('setWeb3Wallet', wallet);
              clearInterval(this.pollAddress);
            }
          });
        }, 500);
      },*/
     /* matchWeb3WalletNetwork() {
        this.pollNetwork = setInterval(() => {
          window.web3.version.getNetwork((err, netId) => {
            if (err) return;
            if (this.$store.state.network.type.chainID.toString() !== netId) {
              Object.keys(networkTypes).forEach(net => {
                if (networkTypes[net].chainID.toString() === netId) {
                  this.$store.dispatch(
                    'switchNetwork',
                    this.$store.state.Networks[net][0]
                  );
                  clearInterval(this.pollNetwork);
                }
              });
            }
          });
        }, 500);
      },*/
      clearIntervals() {
        const self = this;
        if (self.wallet === null) {
          clearInterval(self.pollNetwork);
          clearInterval(self.pollBalance);
          clearInterval(self.pollBlock);
          clearInterval(self.pollAddress);
        }
      },
      setupOnlineEnvironment() {
        if (this.$store.state.online === true) {
          if (this.wallet !== null) {
//            if (this.wallet.identifier === 'Web3') {
//              this.checkWeb3WalletAddrChange();
//              this.matchWeb3WalletNetwork();
//            }
            this.getBalance();
            this.pollBalance = setInterval(this.getBalance, 1000);
            this.pollBlock = setInterval(this.getBlock, 1000);
//            this.setTokens();
//            this.setENS();
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'InterfaceLayout.scss';
</style>
