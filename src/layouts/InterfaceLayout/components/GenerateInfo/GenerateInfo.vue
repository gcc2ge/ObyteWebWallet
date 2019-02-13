<template>
  <div class="generate-info">
    <div class="wrap">

      <div class="send-form">
        <div class="title-container">
          <div class="title-and-copy">
            <div><h4>{{ $t("generateInfo.fromAddress") }}</h4></div>
            <div class="form-controller">
              <p
                class="linker-1 prevent-user-select"
                @click="deleteFromAddress">{{ $t("generateInfo.clear") }}</p>
              <p
                class="linker-1 prevent-user-select"
                @click="copyFromAddress">{{ $t("generateInfo.copy") }}</p>
            </div>
          </div>
        </div>
        <div class="the-form gas-amount">
          <input
            ref="fromaddress"
            :value="$store.state.wallet.getAddressString()"
            type="text"
            placeholder="From Address"
            autocomplete="off" >
          <div class="good-button-container">
            <i
              :class="[isValid ? 'not-good' : '', 'fa fa-check-circle good-button']"
              aria-hidden="true"/>
          </div>
        </div>
      </div>

      <div
        v-if="moreInfoGenerated"
        class="submit-button-container">
        <div
          class="submit-button large-round-button-green-filled clickable"
          @click="generateTx">
          {{ $t("generateInfo.continue") }}
        </div>
      </div>
      <interface-bottom-text
        link="/"
        question="Have issues?"
        link-text="Learn More"/>
    </div>
  </div>
</template>

<script>
import InterfaceBottomText from '@/components/InterfaceBottomText';
export default {
  components: {
    'interface-bottom-text': InterfaceBottomText,
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
      moreInfoGenerated: true,
      isValid: false
    };
  },
  methods: {
    /*generateInfo() {
      this.moreInfoGenerated = true;
    },*/
    copyFromAddress() {
      this.$refs.fromaddress.select();
      document.execCommand('copy');
    },
    deleteFromAddress() {
      this.$refs.fromaddress.value = '';
    },
    generateTx() {
      this.$emit('pathUpdate', 'genTx');
    },
    gasLimitUpdated(e) {
      this.$emit('gasLimitUpdate', e);
    },
    nonceUpdated(e) {
      this.$emit('nonceUpdate', e);
    },
    async checkAddress() {
      return await this.$store.state.client.bb.isAddress(
        this.$store.state.wallet.getAddressString()
      );
    },
    async mounted() {
      this.isValid = await this.checkAddress();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'GenerateInfo.scss';
</style>
