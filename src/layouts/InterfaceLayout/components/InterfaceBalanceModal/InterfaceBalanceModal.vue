<template>
  <div class="modal-container">
    <b-modal
      ref="balance"
      :title="$t('interface.balance')"
      hide-footer
      centered
      class="bootstrap-modal balance nopadding">
      <div class="content-block total-balance">
        <div class="flex-container">
          <h4 class="modal-title">{{ $t('common.totalBalance') }}</h4>
          <div class="margin-left-auto total-balance-amount">
            <span>{{ balance }}</span> MB
          </div>
        </div>
      </div>

      <div class="content-block">
        <h4 class="equivalent-values-title">{{ $t('interface.equivalentValues') }}</h4>
        <ul class="equivalent-values">
          <li
            v-for="ev in equivalentValues"
            :key="ev.key">
            <img :src="ev.image">
            <p>{{ ev.name }}</p>
            <p class="ev-value">{{ ev.value }}</p>
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import iconBtc from '@/assets/images/currency/btc.svg';
import iconRep from '@/assets/images/currency/rep.svg';
import iconEur from '@/assets/images/currency/eur.svg';
import iconChf from '@/assets/images/currency/chf.svg';
import iconGbp from '@/assets/images/currency/gbp.svg';
import iconUsd from '@/assets/images/currency/usd.svg';
import iconCny from '@/assets/images/currency/cny.svg';

import axios from 'axios';
import Utils from 'bitcore-wallet-client/lib/common/utils'
import Constants from 'bitcore-wallet-client/lib/common/constants'

export default {
  props: {
    balance: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      equivalentValues: [
        {
          image: iconCny,
          name: 'CNY',
          value: '0'
        },{
          image: iconBtc,
          name: 'BTC',
          value: '0'
        },
        {
          image: iconUsd,
          name: 'USD',
          value: '0'
        },
      ],
      pollBalance: () => {

      },
    };
  },
  mounted() {
    this.setupOnlineEnvironment()
  },
  destroyed() {
    this.clearIntervals();
  },
  methods: {
    async getEquivalent(amount) {
      const convertTo = 'CNY';
      const BASE_URL = 'https://api.coinmarketcap.com/v1/ticker';
      const currency = 'byteball';

      const createApiUrl = currency =>
        `${BASE_URL}/${currency}/?convert=${convertTo}`;

      const response = await axios.get(createApiUrl(currency));

      for (let i=0;i<this.equivalentValues.length;i++){
        let a = this.equivalentValues[i];
        if (response.data && response.data.length >= 1){
          a.value=response.data[0][`price_${a.name.toLowerCase()}`]*amount;
        }
      }
    },
    calcBalance() {
      const val = Constants.UNITS['mega'].value;
      var amount =Utils.formatAmount(this.balance * val,"giga");
      this.getEquivalent(amount);
    },
    clearIntervals() {
      clearInterval(self.pollBalance);
    },
    setupOnlineEnvironment() {
      this.pollBalance = setInterval(this.calcBalance, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'InterfaceBalanceModal.scss';
</style>
