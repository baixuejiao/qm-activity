<!-- 信息注册页面 -->
<template>
  <div id="register">
    <header id="register-header">
      <img id="register-logo" src="@/assets/imgs/logo.png" alt="">
    </header>

    <ul id="register-content">
      <li class="register-wrapper clearfix">
        <section class="register-wrapper-list">
          <span>
            <i class="icon iconfont icon-xingmingyonghumingnicheng"></i>
          </span>
          <input type="text" placeholder="请输入姓名" v-model="nickName" @blur="checkNickname" @input="clearError('nickName')">
        </section>
        <p class="register-wrapper-error">{{errorData.nickName || ''}}</p>
      </li>
      <li class="register-wrapper">
        <section class="register-wrapper-list">
          <span>
            <i class="icon iconfont icon-shoujihao"></i>
          </span>
          <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="tel" @blur="checkPhone" @input="clearError('tel')">
        </section>
        <p class="register-wrapper-error">{{errorData.tel || ''}}</p>
      </li>
      <!-- <li class="register-wrapper">
        <section class="register-wrapper-list">
          <span>
            <i class="icon iconfont icon-dibudaohanglan-"></i>
          </span>
          <input type="text" placeholder="请选择学校" v-model="school" readonly @click="chooseSchool()" />
        </section>
        <p class="register-wrapper-error">{{errorData.school || ''}}</p>
      </li> -->
      <li class="register-wrapper">
        <section class="register-wrapper-list">
          <span>
            <i class="icon iconfont icon-mima"></i>
          </span>
          <input type="password" placeholder="请输入6~16位密码" maxlength="16" v-model="password" @blur="checkPassword" @input="clearError('password')">
        </section>
        <p class="register-wrapper-error">{{errorData.password || ''}}</p>
      </li>
      <li class="register-wrapper">
        <section class="register-wrapper-list">
          <span>
            <i class="icon iconfont icon-mima"></i>
          </span>
          <input type="password" placeholder="请再次输入密码" maxlength="16" v-model="pwd" @blur="checkPwd" @input="clearError('pwd')">
        </section>
        <p class="register-wrapper-error">{{errorData.pwd || ''}}</p>
      </li>
      <li class="register-wrapper">
        <section class="register-wrapper-list">
          <span>
            <i class="icon iconfont icon-dibudaohanglan-"></i>
          </span>
          <input type="text" placeholder="班级" v-model="school" readonly @click="chooseSchool()" />
        </section>
        <p class="register-wrapper-error">{{errorData.school || ''}}</p>
      </li>
      
    </ul>
    <p class="register-rules">
      <input type="checkbox" id="register-wrapper-checkbox" v-model="checkTag">
      <label for="register-wrapper-checkbox">确认以上信息全部真实有效</label>
    </p>

    <footer id="register-footer">
      <span id="register-button" @click="checkEmpty">提交</span>
    </footer>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div class="cover" v-if="showloading">
      <van-loading class="loading" color="#000" vertical>提交中...</van-loading>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      showloading: false,
      value: '',
      showPicker: false,
      // columns: ['哈尔滨工业大学','哈尔滨工程大学','东北林业大学','东北农业大学','黑龙江大学', '哈尔滨理工大学', '哈尔滨师范大学', '哈尔滨商业大学', '黑龙江科技大学', '哈尔滨金融学院', '黑龙江工程学院'],
      columns: ['编程训练营第二季'],
      errorData: {
        nickName: '',
        tel: '',
        password: '',
        pwd: '',
        school: ''
      },
      nickName: '',
      tel: '',
      password: '',
      pwd: '',
      school: '',
      checkTag: false
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    clearError(tag) {
      if (this[tag]) {
        this.errorData[tag] = ''
      }
    },
    checkEmpty() {
      if (this.nickName && this.tel && this.password && this.pwd && this.checkTag) {
        this.submit()
      } else if (!this.nickName) {
        this.errorData.nickName = '姓名不能为空'
      } else if (!this.tel) {
        this.errorData.tel = '手机号不能为空'
      } else if (!this.school) {
        this.errorData.school = '请选择班级'
      } else if (!this.password) {
        this.errorData.password = '密码不能为空'
      } else if (!this.pwd) {
        this.errorData.pwd = '请再次输入密码'
      } else if (!this.checkTag) {
        this.$dialog.alert({
          message: '请勾选确认信息'
        });
        // this.$store.commit("showDialog", '')
      } 
    },
    // 提交信息 判断为空状态
    submit() {
      this.showloading = true
      this.$post(window.BASE_API+'user/register',
      {
        nickName: this.nickName,
        tel: this.tel,
        password: this.password,
        school: this.school
      })
      .then( res => {
        this.showloading = false
        if( res.errno * 1 === 101) {
          this.login()
        }else {
          this.$dialog.alert({
            message: res.errmsg
          });
        }
      })
      .catch( err => {
        // console.log(err)
        this.showloading = false
        this.$dialog.alert({
          message: err
        });
      })
    },
    login() {
      
      this.$post(window.LOGIN_API+'newLogin',{
        tel: this.tel,
        pass: this.password
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          localStorage.setItem('token', res.userInfor.token)
          localStorage.setItem('tokenId', res.userInfor._id)
          this.setUserInfo(res.userInfor)
          this.$router.push('/success')
        } else {
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
    },
    checkNickname() {
      // window.scroll(0,0);
      if (!this.nickName.length) {
        this.errorData.nickName = '姓名不能为空'
      } else {
        this.errorData.nickName = ''
      }
    },
    checkPhone() {
      // window.scroll(0,0);
      if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
        this.errorData.tel = '手机号码格式错误'
      } else {
        this.errorData.tel = ''
      }
    },
    checkPassword() {
      // window.scroll(0,0);
      if (this.password.length < 6) {
        this.errorData.password = '密码长度需大于6位'
      } else {
        this.errorData.password = ''
      }
    },
    checkPwd() {
      // window.scroll(0,0);
      if (this.password !== this.pwd) {
        this.errorData.pwd = '两次密码输入不一致'
      } else {
        this.errorData.pwd = ''
      }
    },
    chooseSchool() {
      this.showPicker = true
      this.errorData.school = ''
    },
    onConfirm(value) {
      this.school = value
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
      // Toast('取消');
    }
  }
}
</script>

<style lang="scss" scoped>
  #register{
    width: 100%;
    min-height: 100%;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .cover{
      width: 2.5rem;
      height: 2.5rem;
      text-align: center;
      border-radius: 5px;
      background: rgba(255,255,255,0.8);
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .loading{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    #register-header{
      padding-top: 1rem;

      img{
        display: block;
        width: 2rem;
        margin: 0 auto;
      }
    }

    #register-content{
      margin-top: .4rem;
    }
    .register-wrapper{
      width: 6.8rem;
      margin: 0 auto;
      position: relative;
      
      .register-wrapper-list{
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
      .register-wrapper-error{
        width: 100%;
        height: .6rem;
        padding: 0 .2rem;
        line-height: .6rem;
        font-size: .24rem;
        color: red;
      }
    }
    .register-rules{
      width: 6.8rem;
      margin: 0 auto;
      color: #aaa;
      
      input{
        width: .32rem;
        height: .32rem;
        margin-right: .1rem;
        border-radius: 50%;
        background: url('../../assets/imgs/check.png') center no-repeat;
        background-size: contain;
        -webkit-appearance:none;
        outline: none;
        vertical-align: middle;

        &:checked{
          background: url('../../assets/imgs/checked.png') center no-repeat;
          background-size: contain
        }
      }
    }
    #register-footer{
      width: 100%;
      margin: .5rem auto 0;
      padding-bottom: .5rem;
    }
    #register-button{
      display: block;
      width: 6.8rem;
      height: 1rem;
      margin: 0 auto;
      // margin-left: -3.4rem;
      text-align: center;
      line-height: 1rem;
      font-weight: 500;
      font-size: .36rem;
      color: #fff;
      border-radius: 4px;
      box-shadow: 0 10px 30px rgba(0,0,0,.2);
      background: linear-gradient(to right,#f05a28 0,#e80a89 100%);
      background-color: #e80a89;
      // position: absolute;
      // bottom: .4rem;
      // left: 50%;
    }
    
  }
</style>