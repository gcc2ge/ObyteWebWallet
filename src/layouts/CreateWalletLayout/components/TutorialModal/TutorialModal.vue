<template>
  <b-modal
    ref="tutorial"
    hide-footer
    centered
    hide-header
    class="bootstrap-modal">
    <div class="d-block text-center">
      <h2 class="title">{{ $t("start_tutoris.title") }}</h2>
      <p class="content">
        {{ $t("start_tutoris.content") }}<br>
        <span @click="skip">{{ $t("start_tutoris.content_skip") }}</span> {{ $t("start_tutoris.content_risk") }}
      </p>
    </div>
    <div class="button-container fixed-width-1">
      <router-link
        to="/getting-started"
        class="mid-round-button-green-filled close-button">
        {{ $t("start_tutoris.continue") }}
      </router-link>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    skip: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import 'TutorialModal.scss';
</style>
