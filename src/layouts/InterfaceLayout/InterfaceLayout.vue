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
  import Utils from 'bbwallet/bitcore-wallet-client/lib/common/utils'

  import WalletNotFoundContainer from './containers/WalletNotFoundContainer';

  import InterfaceAddress from './components/InterfaceAddress';
  import InterfaceBalance from './components/InterfaceBalance';
  import InterfaceNetwork from './components/InterfaceNetwork';
  import InterfaceSideMenu from './components/InterfaceSideMenu';
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
        var self = this;
        client.api.getLastMci(function (err, result) {
          self.blockNumber = result;
        });
      },
      getBalance() {
        const client = this.$store.state.client;
        var self = this;
        const address = this.address;
        var arr = [address];

        client.api.getBalances(arr, function (err, result) {
//          console.info(`err ${JSON.stringify(err)}`)
//          console.info(`result ${JSON.stringify(result)}`)
          if (result) {
            var stable_Balance = result[address].base.stable;
//            var pending_Balance = result[address].base.pending;
            var pending_Balance = 0;
            var balance = pending_Balance + stable_Balance;
            self.balance = Utils.formatAmount(balance, "mega");
            self.$store.dispatch('setAccountBalance', self.balance);
          } else {
            self.balance = self.$store.state.account.balance;
//            console.info(`error ${JSON.stringify(err)}`);
          }
        });

      },

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
            this.getBalance();
            this.pollBalance = setInterval(this.getBalance, 1000);
            this.pollBlock = setInterval(this.getBlock, 1000);
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'InterfaceLayout.scss';
</style>
