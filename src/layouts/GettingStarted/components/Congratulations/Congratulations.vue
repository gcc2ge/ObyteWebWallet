<template>
  <div class="what-is-mew">

    <div class="block-progressbar">
      <dir class="block-progressbar__container">
        <div class="block-progressbar__title">
          {{ $t("start_congratulation.congratulations") }}
        </div>
        <div class="block-progressbar__progressbar">
          <div :class="progressBarValue"/>
        </div>
        <div class="block-progressbar__content text-cented">

          <img src="~@/assets/images/icons/drink.svg">

          <p>
            {{ $t("start_congratulation.content") }}
            <a href="">{{ $t("start_congratulation.help_center") }}</a>. {{ $t("start_congratulation.help") }}
          </p>

          <router-link to="/create-wallet">
            <div class="mid-round-button-green-filled-green-border">{{ $t("start_congratulation.start") }}</div>
          </router-link>

        </div>
      </dir>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    progressBarValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '../BlockWithProgressBar.scss';
</style>
