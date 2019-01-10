<template>
  <div class="what-is-mew">

    <div class="block-progressbar">
      <dir class="block-progressbar__container">
        <div class="block-progressbar__title">
          {{ $t("start_introduce.about") }}
        </div>
        <div class="block-progressbar__progressbar">
          <div :class="progressBarValue"/>
        </div>
        <div class="block-progressbar__content">
          <h4>{{ $t("start_introduce.title") }}</h4>
          <p>
            {{ $t("start_introduce.content") }}
          </p>
          <p>
            {{ $t("start_introduce.content_1") }}
          </p>
          <div class="block-progressbar__warning">
            {{ $t("start_introduce.warning") }}
          </div>
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
