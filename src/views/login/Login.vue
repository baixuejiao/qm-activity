<template>
  <div id="login">
    <header id="login-header">
      <img id="login-logo" src="@/assets/imgs/logo.png" alt="">
    </header>

    <ul id="login-content">
      <li class="login-wrapper">
        <section class="login-wrapper-list">
          <span>
            <i class="icon iconfont icon-shoujihao"></i>
          </span>
          <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="tel" @input="clearError('tel')" @blur="checkPhone">
        </section>
        <p class="login-wrapper-error">{{errorData.tel || ''}}</p>
      </li>
      
      <li class="login-wrapper">
        <section class="login-wrapper-list">
          <span>
            <i class="icon iconfont icon-mima"></i>
          </span>
          <input type="password" placeholder="请输入6~16位密码" maxlength="16" v-model="pass" @input="clearError('pass')">
        </section>
        <p class="login-wrapper-error">{{errorData.pass || ''}}</p>
      </li>
      
    </ul>

    <footer id="login-footer">
      <span id="login-button" @click="login">登录</span>
    </footer>

    

  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      tel: '',
      pass: '',
      errorData: {
        tel: '',
        pass: ''
      },
      redirect_url: this.$route.query.redirect_url
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    clearError(tag) {
      if (this[tag]) {
        this.errorData[tag] = ''
      }
    },
    checkPhone() {
      if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
        this.errorData.tel = '手机号码格式错误'
      } else {
        this.errorData.tel = ''
      }
    },
    login() {
      if (this.tel && this.pass) {
        this.submit()
      } else if (!this.tel) {
        this.errorData.tel = '请输入登录手机号'
      } else if (!this.pass) {
        this.errorData.pass = '请输入登录密码'
      }
    },
    submit() {
      this.$post(window.LOGIN_API+'newLogin',{
        tel: this.tel,
        pass: this.pass
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          localStorage.setItem('token', res.userInfor.token)
          localStorage.setItem('tokenId', res.userInfor._id)
          localStorage.setItem('tel', res.userInfor.tel)
          this.setUserInfo(res.userInfor)

          if (this.redirect_url && this.redirect_url.length>0) {
            this.$router.push(this.redirect_url)
          } else {
            this.$router.push({ path: "/" })
          }
        } else {
          this.$store.commit("showDialog", res.errmsg)
        }
      })
      .catch( err => {
        this.$store.commit("showDialog",err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #login{
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    #login-header{
      padding: 1rem 0 .6rem;

      img{
        display: block;
        width: 2rem;
        margin: 0 auto;
      }
    }

    #login-content{
      margin-top: .4rem;
    }
    .login-wrapper{
      width: 6.8rem;
      margin: 0 auto 0;
      position: relative;
      
      .login-wrapper-list{
        display: flex;
        width: 100%;
        height: 1rem;
        border: 1px solid #aaa;
        border-radius: 4px;
      }

      span{
        width: .8rem;
        height: .6rem;
        padding: 0.2rem 0;
        line-height: .6rem;
        text-align: center;
        position: relative;

        i{
          color: #aaa;
        }
        &:after{
          content: '';
          display: block;
          width: 100%;
          border-right: 1px solid #aaa;
          position: absolute;
          right: 0;
          top: .2rem;
          bottom: .2rem;
        }
      }
      input{
        width: 6.0rem;
        height: .6rem;
        padding: .2rem 0;
        margin-left: .4rem;
        background: transparent;
        color: #fff;
      }
      .login-wrapper-error{
        width: 100%;
        height: .6rem;
        padding: 0 .2rem;
        line-height: .6rem;
        font-size: .24rem;
        color: red;
      }
    }

    #login-footer{
      width: 100%;
      // margin: .5rem auto 0;
      // padding-bottom: .5rem;
      position: absolute;
      left: 0;
      bottom: .6rem;
    }
    #login-button{
      display: block;
      width: 6.8rem;
      height: 1rem;
      margin: 0 auto;
      text-align: center;
      line-height: 1rem;
      font-weight: 500;
      font-size: .36rem;
      color: #fff;
      border-radius: 4px;
      box-shadow: 0 10px 30px rgba(0,0,0,.2);
      background: linear-gradient(to right,#f05a28 0,#e80a89 100%);
      background-color: #e80a89;
    }
  }
</style>