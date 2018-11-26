<template>
  <b-modal
    ref="password"
    :title="$t('accessWallet.password')"
    hide-footer
    class="bootstrap-modal modal-software"
    centered>
    <form class="password-form">
      <div class="input-container">
        <input
          :type="show ? 'text': 'password'"
          v-model="password"
          name="Password"
          autocomplete="off" >
        <img
          v-if="show"
          src="@/assets/images/icons/show-password.svg"
          @click.prevent="switchViewPassword">
        <img
          v-if="!show"
          src="@/assets/images/icons/hide-password.svg"
          @click.prevent="switchViewPassword">
      </div>
      <p
        v-show="error !== ''"
        class="error"> {{ error }} </p>
      <button
        :disabled=" password === '' && password.length === 0 && password.length < 9"
        class="submit-button large-round-button-green-filled"
        type="submit"
        @click.prevent="unlockWallet">
        {{ $t("accessWallet.unlock") }}
      </button>
    </form>
  </b-modal>
</template>

<script>
import { BasicWallet } from '@/wallets';
//import Worker from 'worker-loader!@/workers/unlockWallet.worker.js';
import { Wallet } from '@/helpers';
export default {
  props: {
    file: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      show: false,
      password: '',
      error: ''
    };
  },
  watch: {
    password() {
      this.error = '';
    }
  },
  methods: {
    unlockWallet() {
//      const worker = new Worker();
      const self = this;
      var wallet =Wallet.import(this.file, this.password);
      self.$store.dispatch(
        'decryptWallet',
        BasicWallet.unlock({
          type: 'manualPrivateKey',
          manualPrivateKey: wallet._privKey.xprivkey
        })
      );
      self.$router.push({ path: 'interface' });
      /*worker.postMessage({
        type: 'unlockWallet',
        data: [this.file, this.password]
      });
      worker.onmessage = function(e) {
        console.info(`e: ${JSON.stringify(e)}`)
        // Regenerate the wallet since the worker only return an object instance. Not the whole wallet instance
        self.$store.dispatch(
          'decryptWallet',
          BasicWallet.unlock({
            type: 'manualPrivateKey',
            manualPrivateKey: e.data._privKey
//            manualPrivateKey: Buffer.from(e.data._privKey).toString('hex')
          })
        );
        self.$router.push({ path: 'interface' });
      };
      worker.onerror = function(e) {
        self.error = JSON.stringify(e);
      };*/
    },
    switchViewPassword() {
      this.show = !this.show;
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'PasswordModal.scss';
</style>
