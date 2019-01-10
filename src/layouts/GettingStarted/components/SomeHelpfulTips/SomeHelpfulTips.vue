<template>
  <div class="what-is-mew">

    <div class="block-progressbar">
      <dir class="block-progressbar__container">
        <div class="block-progressbar__title">
          {{ $t("start_tips.about") }}
        </div>
        <div class="block-progressbar__progressbar">
          <div :class="progressBarValue"/>
        </div>
        <div class="block-progressbar__content">
          <h4>{{ $t("start_tips.some_tips") }}</h4>

          <div class="tips">
            <div>
              <h5>{{ $t("start_tips.tips_one_title") }}</h5>
              <p>{{ $t("start_tips.tips_one_content") }}</p>
            </div>
            <div>
              <h5>{{ $t("start_tips.tips_two_title") }}</h5>
              <p>
                {{ $t("start_tips.tips_two_content") }}
              </p>
            </div>
            <div>
              <h5>{{ $t("start_tips.tips_three_title") }}</h5>
              <p>
                {{ $t("start_tips.tips_three_content") }}
              </p>
            </div>
            <!--<div>-->
              <!--<h5>Buy a hardware wallet</h5>-->
              <!--<p>-->
                <!--We have many great hardware wallets listed on our interface.-->
                <!--They're only about $100. It's worth for your security.-->
                <!--Buy one <a-->
                  <!--href=""-->
                  <!--target="_blank">here</a>.-->
              <!--</p>-->
            <!--</div>-->
            <div>
              <h5>{{ $t("start_tips.tips_four_title") }}</h5>
              <p>
                {{ $t("start_tips.tips_four_content") }}
                <a href="mailto:support@byteballtalk.com">{{ $t("start_tips.tips_four_content_link_content") }}</a>.
                {{ $t("start_tips.tips_four_content_1") }}
              </p>
            </div>
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
