<!-- 活动宣传页面 -->
<template>
  <div id="index">
    <div id="index-container">
      <span id="index-more" @click="goMore">查看更多参赛视频>></span>
      <img src="@/assets/imgs/banner.jpeg" alt="">
      <div id="index-video">
        <vote-tpl v-for="(item, index) in voteList" :key="index" :videoInfo="item" />
        <div class="index-more">
          <a href="javascript:void(0)" @click="goMore">查看更多参赛视频>></a>
        </div>
      </div>
      <div id="index-wrapper">
        <span class="index-wrapper-btn" @click="goRegister">报名参赛</span>
        <span class="index-wrapper-btn" @click="goComplete">提交视频资料</span>
      </div>
    </div>
  </div>
</template>

<script>
import voteTpl from '@/components/voteTpl.vue'

export default {
  data() {
    return {
      tokenId: localStorage.getItem('tokenId'),
      page: 1,
      maxCount: 10,
      keyword: '',
      voteList: []
    }
  },
  components: {
    voteTpl
  },
  methods: {
    goRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    goMore() {
      this.$router.push({
        name: 'vote'
      })
    },
    goComplete() {
      if (this.tokenId) {
        this.$router.push({
          name: 'complete'
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect_url: '/complete'
          }
        })
      }
    },
    getList(){
      this.$post(window.BASE_API+'user/vlogUserList', {
        page: this.page,
        maxCount: this.maxCount,
        keyword: this.keyword
      })
      .then( res => {
        if( res.errno * 1 === 101) {
          // this.total = res.data.pageData.total
          this.voteList = [...res.data.pageData.list]
          
        }else {
          this.$dialog.alert({
            message: res.errmsg
          });
        }
      })
      .catch( err => {
        this.$dialog.alert({
          message: err
        });
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
  #index{
    width: 100%;
    color: #fff;
    background: #b9d6f4;
    position: relative;

    #index-container{
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
    }
    #index-more{
      display: inline-block;
      padding: 0 0.2rem;
      color: #638eb8;
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(255,255,255,0.6);
      cursor: pointer;
    }

    img{
      display: block;
      width: 100%;
    }

    #index-video{
      padding: .4rem 0;

      .index-more{
        text-align: center;
        a{
          color: #fff;
          &:hover{
            color: #638eb8;
          }
        }
      }
    }

    #index-wrapper{
      width: 100%;
      // padding: 0 2%;
      // padding-bottom: .4rem;

      .index-wrapper-btn{
        display: inline-block;
        width: 50%;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        // border-radius: 4px;
        background: #638eb8;
        position: relative;
        cursor: pointer;

        &:first-child{

          &:after{
            content: '';
            display: inline-block;
            width: 1px;
            height: 100%;
            border-right: 1px solid #fff;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
</style>