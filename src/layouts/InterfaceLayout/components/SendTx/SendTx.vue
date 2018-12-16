<template>
  <div class="generate-info">
    <success-modal
      :link-message="'Ok'"
      message="Success"/>
    <div class="wrap">
      <div class="send-form">
        <div class="title-container">
          <div class="title">
            <div><h4>{{ $t("generateInfo.signedTransaction") }}</h4></div>
            <div class="form-controller">
              <p
                class="linker-1 prevent-user-select"
                @click="deleteTxHex">{{ $t("generateInfo.clear") }}</p>
              <p
                class="linker-1 prevent-user-select"
                @click="copyTxHex">{{ $t("generateInfo.copy") }}</p>
            </div>
          </div>
        </div>

        <div class="the-form gas-amount">
          <textarea
            ref="txHex"
            v-model="signedTx"
            name=""
            placeholder="Enter TX Hex"/>
        </div>
      </div>
      <div class="submit-button-container">
        <div
          class="submit-button large-round-button-green-filled clickable"
          @click="sendTx">
          {{ $t("generateInfo.sendTransaction") }}
        </div>
        <interface-bottom-text
          :link="'/'"
          :link-text="'Learn more'"
          :question="'Have any issues?'"/>
      </div>
    </div>
  </div>
</template>

<script>
import InterfaceBottomText from '@/components/InterfaceBottomText';
import SuccessModal from '@/containers/ConfirmationContainer/components/SuccessModal/SuccessModal.vue';

export default {
  components: {
    'interface-bottom-text': InterfaceBottomText,
    'success-modal': SuccessModal
  },
  props: {
    rawTx: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      signedTx: this.rawTx
    };
  },
  watch: {
    rawTx(newVal) {
      this.signedTx = newVal;
    }
  },
  methods: {
    deleteTxHex() {
      this.signedTx = '';
    },
    copyTxHex() {
      this.$refs.txHex.select();
      document.execCommand('copy');
    },
    sendTx() {
      this.$store.state.client.bb
        .sendSignedTransaction(this.signedTx)
        .then(() => {
          this.$children[0].$refs.success.show();
          // eslint-disable-next-line no-console
        });
    },
    hideModal() {
      this.$children[0].$refs.success.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'SendTx.scss';
</style>
