<template>
  <div class="generate-info">
    <div class="wrap">

      <div class="send-form">
        <div class="form-block amount-to-address">
          <div class="amount">
            <div class="title">
              <h4>{{ $t("generateInfo.amount") }}</h4>
            </div>
            <currency-picker
              :currency="coinType"
              :token="true"
              page="sendOfflineGenTx"
              @selectedCurrency="setSelectedCurrency"/>
            <div class="the-form amount-number">
              <input
                v-model="toAmt"
                type="number"
                name=""
                placeholder="Deposit Amount">
              <i
                :class="[parsedBalance < amount ? 'not-good': '','fa fa-check-circle good-button']"
                aria-hidden="true"/>
            </div>
          </div>
          <div class="to-address">
            <div class="title">
              <h4>{{ $t("generateInfo.toAddress") }}</h4>
              <blockie
                v-show="(address !== '' || resolvedAddress !== '') && !validAddress"
                :address="address !== '' ? address: resolvedAddress !== ''? resolvedAddress:''"
                width="22px"
                height="22px"/>
              <p
                class="copy-button linker-1 prevent-user-select"
                @click="copyToAddress">{{ $t("generateInfo.copy") }}</p>
            </div>
            <div class="the-form address-block">
              <textarea
                ref="toaddress"
                v-model="address"
                name="name"
                placeholder="Please Enter The Address"/>
              <i
                :class="[validAddress ? '':'not-good', 'fa fa-check-circle good-button']"
                aria-hidden="true"/>
            </div>
          </div>
        </div>
        <div
          v-show="parsedBalance < amount"
          class="error-message-container">
          <p>You don't have enough funds</p>
        </div>
      </div>

      <!--<div class="send-form">
        <div class="title-container">
          <div class="title">
            <div class="title-helper">
              <h4>Data</h4>
              <popover :popcontent="$t('popover.whatIsDataContent')"/>
            </div>
          </div>
        </div>
        <div class="the-form gas-amount">
          <input
            v-model="toData"
            type="number"
            name=""
            placeholder="e.g. 0x65746865726d696e652d657531" >
          <div class="good-button-container">
            <i
              class="fa fa-check-circle good-button not-good"
              aria-hidden="true"/>
          </div>
        </div>
      </div>-->
      <!--<tx-speed-input
        :nonce="nonce"
        :data="toData"
        :value="toAmt"
        :to-address="address"
        :gas-limit="gasLimit"
        @nonceUpdate="nonceUpdated"
        @gasLimitUpdate="gasLimitUpdated"/>-->
      <div class="submit-button-container">
        <div
          :class="[!validAddress ? 'disabled': '' ,'submit-button large-round-button-green-filled']"
          @click="next">
          {{ $t("generateInfo.generate") }}
        </div>
        <interface-bottom-text
          link="/"
          question="Have issues?"
          link-text="Learn More"/>
      </div>

    </div>
    <signed-tx-modal
      :signed-tx="signed"
      :raw-tx="raw"
      :path-update="pathUpdate"/>
  </div>
</template>

<script>
import InterfaceBottomText from '@/components/InterfaceBottomText';
import TxSpeedInput from '../../components/TxSpeedInput';
import CurrencyPicker from '../CurrencyPicker';
import SignedTxModal from '../../components/SignedTxModal';
import Blockie from '@/components/Blockie';
// eslint-disable-next-line
const EthTx = require('ethereumjs-tx')
import * as unit from 'ethjs-unit';
import Utils from 'bitcore-wallet-client/lib/common/utils'
import Constants from 'bitcore-wallet-client/lib/common/constants'

export default {
  components: {
    'interface-bottom-text': InterfaceBottomText,
    'tx-speed-input': TxSpeedInput,
    blockie: Blockie,
    'signed-tx-modal': SignedTxModal,
    'currency-picker': CurrencyPicker
  },
  props: {
    gasLimit: {
      type: Number,
      default: 0
    },
    nonce: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      toAmt: 0,
      amount: 0,
      address: '',
      toData: '0x',
      parsedBalance: 0,
      localGas: this.gasLimit,
      coinType: [],
      selectedCoinType: '',
      raw: {},
      signed: '',
      selectedCurrency: { name: 'mega', symbol: 'MB' },
      locNonce: this.nonce,
      validAddress: false,
      resolvedAddress: ''
    };
  },
  watch: {
    parsedBalance(newVal) {
      this.parsedBalance = newVal;
    },
    gasLimit(newVal) {
      this.localGas = newVal;
    },
    async address(newVal){
      const v = await this.verifyAddr();
      if (v) {
        this.validAddress = true;
      }else{
        this.validAddress = false;
      }
    },
    async toAmt(newVal) {
      this.calculateAmount(newVal);
      const rawBalance = await this.$store.state.client.bb.getBalance(
        this.$store.state.wallet.getAddressString()
      );
      this.parsedBalance = rawBalance;
//      console.info(`amount ${this.amount} parse ${this.parsedBalance}`)
    },
    selectedCurrency(newVal) {
      this.selectedCurrency = newVal;
      this.calculateAmount(this.toAmt);
    }
  },
  async mounted() {
    const rawBalance = await this.$store.state.client.bb.getBalance(
      this.$store.state.wallet.getAddressString()
    );
//    this.parsedBalance = Utils.formatAmount(rawBalance,"mega");
    this.parsedBalance = rawBalance;
  },
  methods: {
    copyToAddress() {
      this.$refs('toaddress').select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    },
    next() {
      const raw = {
        outputs: [
         {address: this.address, amount: this.amount}
        ]
        /*from: this.$store.state.wallet.getAddressString(),
        gas: this.localGas,
        value: unit.toWei(this.toAmt, 'ether'),
        data: this.toData,
        nonce: this.locNonce,
        gasPrice: Number(unit.toWei(this.$store.state.gasPrice, 'gwei')),
        to:
          this.resolvedAddress !== ''
            ? this.resolvedAddress
            : this.address !== ''
              ? this.address
              : '',
        chainId: this.$store.state.network.type.chainID || 1*/
      };
      this.$store.state.client.bb.signTransaction(raw).then(signedTx => {
        this.$emit('createdRawTx', signedTx.rawTransaction);
//
        this.raw = raw;
        this.signed = signedTx.rawTransaction;
        this.$children[3].$refs.signedTx.show();
        window.scrollTo(0, 0);
      });
    },
    setSelectedCurrency(e) {
      this.selectedCurrency = e;
    },
    async verifyAddr() {
      if (this.address.length !== 0 && this.address !== '') {
         const valid = await this.$store.state.client.bb.isAddress(
           this.address
         );
         if (valid) {
           return true;
         }
         return false;
      }
    },
    calculateAmount(newVal){
//      console.info(`${this.selectedCurrency.name} ${Constants.UNITS[this.selectedCurrency.name].value} ${newVal}`)
      const val = Constants.UNITS[this.selectedCurrency.name].value;
      this.amount = newVal * val;
    },
    gasLimitUpdated(e) {
      this.$emit('gasLimitUpdate', e);
    },
    nonceUpdated(e) {
      this.$emit('nonceUpdate', e);
    },
    pathUpdate() {
      this.$emit('pathUpdate', 'sendPubTx');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'GenerateTx.scss';
</style>
