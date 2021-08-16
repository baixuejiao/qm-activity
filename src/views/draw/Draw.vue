<template>
  <div id="draw" class="clearfix">
    <div id="draw-left">
      <header id="draw-header">
        参与活动人数：{{total}}
      </header>
      <img id="draw-img" src="@/assets/imgs/draw_bg.png" alt="">
      <!-- <div id="draw-container">
      </div> -->
      <!-- 结果 -->
      <section class="draw-wrapper" v-if="status">
        <p>{{this.result.tel || ''}} {{this.result.nickName || ''}}</p>
        <p>{{this.result.prize || ''}}</p>
      </section>
      <!-- 过程 -->
      <section class="draw-wrapper" v-else>
        <p>{{this.curShow.tel || ''}} {{this.curShow.nickName || ''}}</p>
        <p>{{this.curShow.prize || ''}} </p>
      </section>

      <span v-if="status" class="draw-btn" @click="begin">开始</span>
      <span v-else class="draw-btn" @click="stop">停止</span>
    </div>

    <aside id="draw-right">
      <!-- <h4>中奖名单</h4> -->
      <img src="@/assets/imgs/result_bg_new.png" alt="">
      <ul>
        <li v-for="(item, index) in resultList" :key="index">
          {{ item.tel || ''}} {{item.nickName || ''}}  {{item.prize || ''}}
        </li>
      </ul>
    </aside>

    <div id="draw-cover" v-show="showCover">
      <van-dropdown-menu>
        <van-dropdown-item title="选择学校" v-model="school" :options="schoolList" @change="chooseSchool" />
      </van-dropdown-menu>
    </div>
    <van-dialog v-model="show" message="本轮抽奖结束～" />
  </div>
</template>

<script>
let Timer = {}
export default {
  data() {
    return {
      showCover: true,
      schoolList: [
        { text: '编程训练营第二季', value: '编程训练营第二季' },
        { text: '哈尔滨工业大学', value: '哈尔滨工业大学' },
        { text: '哈尔滨工程大学', value: '哈尔滨工程大学' },
        { text: '东北林业大学', value: '东北林业大学' },
        { text: '东北农业大学', value: '东北农业大学' },
        { text: '黑龙江大学', value: '黑龙江大学' },
        { text: '哈尔滨理工大学', value: '哈尔滨理工大学' },
        { text: '哈尔滨师范大学', value: '哈尔滨师范大学' },
        { text: '哈尔滨商业大学', value: '哈尔滨商业大学' },
        { text: '黑龙江科技大学', value: '黑龙江科技大学' },
        { text: '哈尔滨金融学院', value: '哈尔滨金融学院' },
        { text: '黑龙江工程学院', value: '黑龙江工程学院' },
      ],
      school: '',
      status: true,
      total: 0,
      showList: [],
      list: [],
      resultList: [],
      result: {},
      curShow: {},
      tag: -1,
      // 奖品池
      pirzelist: [
        '8900VIP课程2000元优惠券',
        '1900VIP课程500元优惠券',
        '12900全栈课程1000元优惠券',
        '小课5折优惠券',
        '小课5折优惠券 ',
        '现金红包10元',
        '现金红包20元',
        '现金红包50元',
        '笔试面试一对一辅导'
      ],
      // 用于循环展示奖品
      showPirze: [
        '8900VIP课程2000元优惠券',
        '1900VIP课程500元优惠券',
        '12900全栈课程1000元优惠券',
        '小课5折优惠券',
        '小课5折优惠券',
        '现金红包10元',
        '现金红包20元',
        '现金红包50元',
        '笔试面试一对一辅导'
      ],
      prizetag: -1,
      show: false,
      localList: []
    }
  },
  methods: {
    // 点击停止 清除定时器 展示结果 数组删除一位
    stop() {
      this.status = true

      this.resultList.push(this.result)

      clearInterval(Timer)
      
      this.list.splice(this.tag, 1)
      this.pirzelist.splice(this.prizetag, 1)

      // 中奖信息存储在本地
      localStorage.setItem('localResult',JSON.stringify(this.resultList));

      // 奖品池空了以后提示抽奖结束
      if (this.pirzelist.length == 0) {
        setTimeout(() => {
          this.show = true
        }, 1500)
      }
    },
    // 循环展示一个人信息
    showPersonal() {
      Timer = setInterval(() => {
        let num = parseInt(Math.random()*this.showList.length)
        let _num = parseInt(Math.random()*this.showPirze.length)
        this.curShow = this.showList[num]
        this.curShow.prize = this.showPirze[_num]
      },50)
    },
    // 点击开始按钮 获取本次中奖者信息
    begin() {
      this.result = {}
      if (this.list.length === 0 || this.pirzelist.length == 0) return
     
      this.status = false
      this.showPersonal()
      
      // 抽取中奖者
      this.tag = parseInt(Math.random()*this.list.length)
      this.result = {...this.list[this.tag]}
      
      // 抽取奖项
      this.prizetag = parseInt(Math.random()*this.pirzelist.length)
      this.result.prize = this.pirzelist[this.prizetag]

    },
    getData() {
      this.$post(window.BASE_API+'user/userList', {
        school: this.school
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          // console.log(res)
          this.showList = [...res.data]
          this.total = res.data.length
          // 过滤中奖信息
          if (this.localList && this.localList.length > 0) {
            this.resultList = [...this.localList]
            this.list = res.data.filter((value) => {
              return this.localList.every(item => {
                return item.userId != value.userId
              })
            })
          } else {
            this.list = [...res.data]
          }
        }else {
          this.$store.commit("showDialog", res.errmsg)
        }
      })
      .catch( err => {
        // console.log(err);
        this.$store.commit("showDialog", err)
      })
    },
    chooseSchool(value) {
      this.chooseSchool = value
      this.getData();
      this.showCover = false;
      // console.log(value)
    }
  },
  created() {
    this.localList = JSON.parse(localStorage.getItem('localResult'))
    // this.getData();

    // 过滤奖池信息
    if (this.localList && this.localList.length>0) {
      
      this.pirzelist = this.pirzelist.filter((value) => {
        return this.localList.every(item => {
          return item.prize != value
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #draw{
    display: flex;
    height: 100%;

    #draw-left{
      width: 65%;
      padding: 50px;

    }
    #draw-img{
      display: block;
      width: 60%;
      margin: 0 auto;
    }
    #draw-right{
      width: 35%;
    
      img{
        display: block;
        width: 300px;
        margin: 0 auto;
        // width: 100%;
      }
      ul{
        margin-top: -10px;
      }
      li{
        padding: 0 20px;
        line-height: 2.0;
        // font-size: 18px;
        font-size: 16px;
        color: #ecd6a5;
      }
    }

    #draw-header{
      margin-bottom: 20px;
      text-align: left;
      font-size: 20px;
      color: #fff;
    }
    #draw-container{
      display: flex;
      justify-content: space-between;
      color: #fff;

      img{
        width: 200px;
      }
    }

    .draw-wrapper{
      width: 70%;
      // height: 50px;
      height: 100px;
      margin: 50px auto;
      text-align: center;
      // font-size: 40px;
      font-size: 30px;
      line-height: 50px;
      border: 1px solid #ebd3a2;
      border-radius: 4px;
      color: #fafceb
    }

    .draw-btn{
      display: block;
      width: 50%;
      height: 60px;
      margin: 0 auto 0;
      font-size: 28px;
      line-height: 60px;
      text-align: center;
      border-radius: 50px;
      color: #452b0c;
      box-shadow: 0 10px 30px rgba(0,0,0,.2);
      background: linear-gradient(to right,#eedeb3 0,#ebd49e 100%);
      background-color: #e80a89;
      transition: box-shadow .3s ease-in-out;
    }
    #draw-cover{
      background: rgba(0,0,0,0.6);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>