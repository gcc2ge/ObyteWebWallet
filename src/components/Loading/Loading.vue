<template>
  <div class='uil-default-css' style='transform:scale(0.3);' v-show="showLoading">
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
    <div style='top:80px;left:93px;width:14px;height:40px;background:#959199;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;'></div>
  </div>
</template>

<script>
  export default {
    props: ["showLoading"]
  }
</script>



<style lang="scss" scoped>
  @import 'Loading.scss';
</style>
