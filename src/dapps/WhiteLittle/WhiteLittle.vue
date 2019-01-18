<template>
  <div class="domain-sale-container">
    <back-button/>
    <!--<loading :showLoading="show"/>-->
    <iframe src="https://123cb.net/" width="100%" height="1200" frameborder="0" scrolling="auto"></iframe>

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
    methods: {
      loaded() {
        alert()
        this.show=false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import 'WhiteLittle';
</style>
