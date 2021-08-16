<template>
  <div id="player">
    <div id="player-container">
      <iframe :src="playerSrc" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
    </div>

    <div id="player-info">
      <h4 class="player-info-title">{{info.vlogName}}</h4>
      <p class="player-info-name">
        <span>{{info.school}} </span>
        <span>{{info.nickName}}</span>
      </p>
      <p class="player-info-vote">
        <span>{{info.voteCount}}票</span>
      </p>
    </div>
    <span class="player-info-btn" @click="goVote">投票</span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tokenId: localStorage.getItem('tokenId'),
      userId: this.$route.query.userId,
      // playerSrc: this.$route.query.url,
      playerSrc: 'http://player.bilibili.com/player.html?aid=71339569&cid=123648486&page=1',
      info: '',
    }
  },
  computed: {
    /**
     * 获取屏幕高度
     */
    cHeight() {
      let _hei = 0
      if(localStorage.getItem('token')) {
        _hei = 64;
      } else {
        _hei = 85;
      }
      return document.documentElement.clientHeight - _hei;
    }
  },
  methods: {
    getData() {
      this.$post(window.BASE_API+'user/vlogUserById', {
        userId: this.userId
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          this.info = res.data
        }else {
          this.$store.commit("showDialog", res.errmsg)
        }
      })
      .catch( err => {
        // console.log(err);
        this.$store.commit("showDialog", err)
      })
    },
    goVote() {
      if (this.tokenId) {
        this.$post(window.BASE_API+'user/userVote', {
          tokenId: this.tokenId,
          userId: this.userId
        })
        .then( res => {
          // handle success
          if( res.errno * 1 === 101) {
            this.$dialog.alert({
              message: '投票成功'
            });
            this.info.voteCount++
            
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
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect_url: `/player?userId=${this.userId}`
          }
        })
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/base.scss';
  #player{
    width: 100%;
    height: 100%;
    // background: #b9d6f4;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    #player-container{
      width: 90%;
      padding-top: .4rem;
      // height: 2rem;
      margin: 0 auto;
      text-align: center;
      // border: 1px solid #638eb8;
    }

    #player-info{
      width: 90%;
      margin: .4rem auto;
      padding: .2rem 0;
      color: #fff;
      background: #638eb8;

      .player-info-title{
        padding: 0 .2rem;
        font-size: .36rem;
        text-align: center;
        line-height: 1.5;
      }
      .player-info-name{
        display: flex;
        justify-content: space-between;
        padding: 0 .2rem;
        font-size: .32rem;
      }
      .player-info-vote{
        display: flex;
        justify-content: space-between;
        padding: 0 .2rem;
        font-size: .32rem;
      }
    }
    .player-info-btn{
      display: block;
      width: 6.8rem;
      height: 1rem;
      margin: 0 auto;
      text-align: center;
      line-height: 1rem;
      font-weight: 500;
      font-size: .36rem;
      color: #fff;
      border-radius: 25px;
      border: 1px solid #638eb8;
      // box-shadow: 0 10px 30px rgba(0,0,0,.2);
      // background: linear-gradient(to right,#f05a28 0,#e80a89 100%);
      // background-color: #e80a89;
    }
  }
 
</style>