<!--
  错误提示弹窗
  全局调用方式：
      打开--》this.$store.commit("showLoading",desc) 
      关闭--》this.$store.commit("hideLoading")
      desc: string类型 传入错误提示文案
-->

<template>
  <div class="dialog" v-show="show">
    <h4 class="dialog-title">提示</h4>
    <p class="dialog-content">{{tips}}</p>
    <span class="dialog-btn" @click="closeDialog()">我知道了</span>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    tips() {
      return this.$store.state.dialogText;
    }
  },
  props: ['show'],
  methods: {
    closeDialog() {
      this.$store.commit("hideDialog")
    }
  }

}
</script>

<style lang="scss" scoped>
  .dialog{
    width: 6rem;
    padding-bottom: .4rem;
    color: #fff;
    background: #222;
    border-radius: 4px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .dialog-title{
      padding: .2rem .4rem;
      font-size: 16px;
      border-bottom: 1px solid #aaa;
    }
    .dialog-content{
      min-height: 1.6rem;
      padding: .4rem;
      text-align: center;
    }
    .dialog-btn{
      display: block;
      width: 2rem;
      height: .6rem;
      margin: 0 auto;
      font-size: .3rem;
      line-height: .6rem;
      text-align: center;
      border-radius: 4px;
      color: #fff;
      box-shadow: 0 10px 30px rgba(0,0,0,.2);
      background: linear-gradient(to right,#f05a28 0,#e80a89 100%);
      background-color: #e80a89;
      transition: box-shadow .3s ease-in-out;
    }
  }
</style>