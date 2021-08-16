<template>
  <div id="success">
    <div id="success-container">
      <h1 id="success-title">提交成功</h1>
      <p id="success-tips">恭喜成功提交，可用此账号登录青盟网站进行学习</p>
      <div id="success-wrapper">
        <img src="@/assets/imgs/meng.png" alt="">
        <img src="@/assets/imgs/qing.png" alt="">
      </div>

      <!-- <span class="success-complete" @click="goComplete">报名参加视频大赛</span> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goComplete() {
      this.$router.push({
        name: 'complete'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #success{
    width: 100%;
    height: 100%;
    position: relative;

    #success-container{
      margin-top: 2rem;
    }
    #success-title{
      width: 100%;
      font-size: .6rem;
      text-align: center;
      font-weight: 500;
      color: #fff;
    }
    #success-tips{
      margin-top: .4rem;
      text-align: center;
      color: #fff;

    }
    #success-wrapper{
      width: 100%;
      margin-top: 1.5rem;
      text-align: center;
      img{
        width: 2rem;
      }
    }
    .success-complete{
      display: block;
      width: 6.8rem;
      height: 1rem;
      margin: 1rem auto 0;
      text-align: center;
      line-height: 1rem;
      font-size: .36rem;
      color: #fff;
      border-radius: 2px;
      background-color: #e80a89;
      background: linear-gradient(to right,#f05a28 0,#e80a89 100%);
      transition: box-shadow .3s ease-in-out;

      &:hover{
        box-shadow: 0 10px 30px rgba(0,0,0,.2);
      }
    }

  }
</style>