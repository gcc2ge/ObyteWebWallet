<template>
  <div class="what-is-mew">

    <div class="block-progressbar">
      <dir class="block-progressbar__container">
        <div class="block-progressbar__title">
          {{ $t("start_losekey.about") }}
        </div>
        <div class="block-progressbar__progressbar">
          <div :class="progressBarValue"/>
        </div>
        <div class="block-progressbar__content">
          <h4>{{ $t("start_losekey.title") }}</h4>
          <p>
            {{ $t("start_losekey.content") }}
            <span>{{ $t("start_losekey.content_emphasize") }}</span>{{ $t("start_losekey.content_1") }}
          </p>

          <ul>
            <li>{{ $t("start_losekey.tip_1") }}</li>
            <li>{{ $t("start_losekey.tip_2") }}</li>
          </ul>

          <div class="block-progressbar__warning hidden"/>
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
