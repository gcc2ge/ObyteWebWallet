<template>
  <div>
    <access-my-wallet-container/>
    <!--<price-bar -->
      <!--:v-if="$store.state.online && tokens.length > 1" -->
      <!--:tokens="tokens"/>-->
    <!--<faqs/>-->
  </div>
</template>

<script>
import AccessMyWalletContainer from './containers/AccessMyWalletContainer';


export default {
  name: 'AccessWalletLayout',
  components: {
    'access-my-wallet-container': AccessMyWalletContainer,

  },
  data() {
    return {
    };
  },

};
</script>

<style lang="scss" scoped>
@import 'AccessWalletLayout.scss';
</style>
