<template>
  <div class="votetpl">
    <section class="votetpl-cover" @click="goPlayer">
      <!-- 封面图片330*200 -->
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572346818881&di=ece47e0f4575154ea4ba07fbb862b44d&imgtype=0&src=http%3A%2F%2Fimg07.huishangbao.com%2Ffile%2Fupload%2F201408%2F19%2F15%2F15-24-17-35-269834.png" alt="">
      <span class="votetpl-cover-icon">
        <i class="icon iconfont icon-bofangqi-bofangxiaodianshi"></i>
      </span>
      <!-- <iframe src="http://player.bilibili.com/player.html?aid=71339569&cid=123648486&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe> -->
    </section>
    <div class="votetpl-info">
      <span>{{videoInfo.school}}</span>
      <span>{{videoInfo.nickName}}</span>
    </div>
    <p class="votetpl-footer">
      <span class="votetpl-footer-count">{{videoInfo.voteCount}}票</span>
      <span class="votetpl-footer-btn" @click="vote">投票</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return{
      tokenId: localStorage.getItem('tokenId')
    }
  },
  props: ['videoInfo'],
  methods: {
    goPlayer() {
      this.$router.push({
        name: 'player',
        query: {
          userId: this.videoInfo.userId
        }
      })
    },
    vote() {
      if (this.tokenId) {
        this.$post(window.BASE_API+'user/userVote', {
          tokenId: this.tokenId,
          userId: this.videoInfo.userId
        })
        .then( res => {
          // handle success
          if( res.errno * 1 === 101) {
            this.$dialog.alert({
              message: '投票成功'
            });
            this.videoInfo.voteCount++
            
          }else {
            this.$dialog.alert({
              message: res.errmsg
            });
          }
        })
        .catch( err => {
          // console.log(err);
          this.$dialog.alert({
            message: err
          });
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect_url: '/vote'
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .votetpl{
    display: inline-block;
    width: 3.3rem;
    margin: 0 .2rem .2rem;
    border: .02rem solid #638eb8;
    color: #fff;

    .votetpl-cover{
      width: 3.3rem;
      height: 2rem;
      position: relative;
      overflow: hidden;

      img{
        width: 100%;
      }
      .votetpl-cover-icon{
        display: block;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        i{
          font-size: .64rem;
          color: #dbdbdb;
          cursor: pointer;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          &:hover{
            color: #fff;
          }
        }
      }
    }
    .votetpl-info{
      display: flex;
      padding: .1rem 0.05rem;
      justify-content: space-between;
      font-size: .28rem;
      background: #638eb8;
    }
    .votetpl-footer{
      display: flex;
      justify-content: space-between;
      height: .6rem;
      line-height: .6rem;
      padding: .1rem 0.05rem;
      font-size: .28rem;
      background: #638eb8;

      .votetpl-footer-btn{
        display: inline-block;
        width: 1.2rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        border-radius: 2px;
        background: #e80a89;
        transition: box-shadow .3s ease-in-out;
        cursor: pointer;

        &:hover{
          box-shadow: 0 10px 30px rgba(0,0,0,.2);
          background: linear-gradient(to right,#f05a28 0,#e80a89 100%);
        }
      }
    }

    // .votetpl-cover
  }
</style>