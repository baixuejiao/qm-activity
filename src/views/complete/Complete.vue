<!-- 资料补全页面 -->
<template>
  <div id="complete">
    <header id="complete-header">
      <img id="complete-logo" src="@/assets/imgs/logo.png" alt="">
    </header>

    <ul id="complete-content">
      <li class="complete-wrapper clearfix">
        <section class="complete-wrapper-list">
          <span>
            <i class="icon iconfont icon-xuexiao"></i>
          </span>
          <input type="text" placeholder="专业" v-model="major" @blur="checkMajor" @input="clearError('major')">
        </section>
        <p class="complete-wrapper-error">{{errorData.major || ''}}</p>
      </li>
      <li class="complete-wrapper">
        <section class="complete-wrapper-list">
          <span>
            <i class="icon iconfont icon-banjiguanli"></i>
          </span>
          <input type="text" placeholder="年级" v-model="gender" readonly @click="chooseGender()" />
        </section>
        <p class="complete-wrapper-error">{{errorData.gender || ''}}</p>
      </li>
      <li class="complete-wrapper">
        <section class="complete-wrapper-list">
          <span>
            <i class="icon iconfont icon-weixin"></i>
          </span>
          <input type="text" placeholder="微信号码"  v-model="wechatId" @blur="checkWechat" @input="clearError('wechatId')">
        </section>
        <p class="complete-wrapper-error">{{errorData.wechatId || ''}}</p>
      </li>
      <li class="complete-wrapper">
        <section class="complete-wrapper-list">
          <span>
            <i class="icon iconfont icon-18"></i>
          </span>
          <input type="text" placeholder="视频名称"  v-model="vlogName" @input="clearError('vlogName')">
        </section>
        <p class="complete-wrapper-error">{{errorData.vlogName || ''}}</p>
      </li>
      <li class="complete-wrapper">
        <section class="complete-wrapper-list">
          <span>
            <i class="icon iconfont icon-lianjie"></i>
          </span>
          <input type="text" placeholder="视频网盘地址" v-model="vlogNetwork" @input="clearError('vlogNetwork')">
        </section>
        <p class="complete-wrapper-error">{{errorData.vlogNetwork || ''}}</p>
      </li>
    </ul>
    <footer id="complete-footer">
      <span id="complete-button" @click="checkEmpty">提交</span>
    </footer>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.query.userId,
      tel: localStorage.getItem('tel'),
      showPicker: false,
      columns: ['2014','2015','2016','2017','2018', '2019', '2020', '2021', '2022'],
      errorData: {
        major: '',
        gender: '',
        wechatId: '',
        vlogName: '',
        vlogNetwork: ''
      },
      major: '',
      gender: '',
      wechatId: '',
      vlogName: '',
      vlogNetwork: ''
    }
  },
  methods: {
    clearError(tag) {
      if (this[tag]) {
        this.errorData[tag] = ''
      }
    },
    checkEmpty() {
      if (this.major && this.gender && this.wechatId) {
        this.submit()
      } else if (!this.major) {
        this.errorData.major = '专业不能为空'
      } else if (!this.gender) {
        this.errorData.gender = '请选择年级'
      } else if (!this.wechatId) {
        this.errorData.wechatId = '微信号不能为空'
      }
    },
    // 提交信息 判断为空状态
    submit() {
      this.$post(window.BASE_API+'user/updateUser',
      {
        tel: this.tel,
        major: this.major,
        gender: this.gender,
        wechatId: this.wechatId,
        vlogName: this.vlogName,
        vlogNetwork: this.vlogNetwork
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          this.$router.push('/')
        }else {
          this.$store.commit("showDialog", res.errmsg)
        }
      })
      .catch( err => {
        this.$store.commit("showDialog", err)
      })
    },
    // 验证专业
    checkMajor() {
      if (!this.major.length) {
        this.errorData.major = '专业不能为空'
      } else {
        this.errorData.major = ''
      }
    },
    checkWechat() {
      if (!this.password.wechatId) {
        this.errorData.wechatId = '微信号不能为空'
      } else {
        this.errorData.wechatId = ''
      }
    },
    // 选择年级
    chooseGender() {
      this.showPicker = true
      this.errorData.gender = ''
    },
    // 确认年级
    onConfirm(value) {
      this.gender = value
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
  #complete{
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    #complete-header{
      padding-top: 1rem;

      img{
        display: block;
        width: 2rem;
        margin: 0 auto;
      }
    }

    #complete-content{
      margin-top: .4rem;
    }
    .complete-wrapper{
      width: 6.8rem;
      margin: 0 auto;
      position: relative;
      
      .complete-wrapper-list{
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
      .complete-wrapper-error{
        width: 100%;
        height: .6rem;
        padding: 0 .2rem;
        line-height: .6rem;
        font-size: .24rem;
        color: red;
      }
    }
    .complete-rules{
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
    #complete-footer{
      width: 100%;
      margin: .5rem auto 0;
      padding-bottom: .5rem;
    }
    #complete-button{
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