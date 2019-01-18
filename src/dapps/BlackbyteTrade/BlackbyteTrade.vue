<template>
  <div class="domain-sale-container">
    <back-button/>
    <!--<loading :showLoading="show"/>-->
    <!--<iframe src="https://freebe.byte-ball.com/" width="100%" height="1200" frameborder="0" scrolling="auto"></iframe>-->

  </div>
</template>

<script>
  import Loading from '@/components/Loading';
  import BackButton from '@/layouts/InterfaceLayout/components/BackButton';

  export default {
    components: {
      'back-button': BackButton,
      'loading': Loading
    },
    data() {
      return {
        show: true,
      };
    },
    mounted: function() {
      window.open("http://freebe.byte-ball.com/","_blank");
    },
  };
</script>

<style lang="scss" scoped>
  @import 'BlackbyteTrade';
</style>
