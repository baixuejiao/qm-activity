<template>
  <div id="vote">
    <vote-tpl v-for="(item, index) in voteList" :key="index" :videoInfo="item" />
    <div id="vote-footer">
      <span v-if="!isEnd" @click="getMore">点击加载更多</span>
      <span v-else>暂无更多数据</span>
    </div>
  </div>
</template>

<script>
import voteTpl from '@/components/voteTpl.vue'
export default {
  data() {
    return {
      total: 0,
      page: 1,
      maxCount: 10,
      keyword: '',
      voteList: [],
      isEnd:false,
    }
  },
  components: {
    voteTpl
  },
  methods: {
    getList(){
      this.$post(window.BASE_API+'user/vlogUserList', {
        page: this.page,
        maxCount: this.maxCount,
        keyword: this.keyword
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 101) {
          this.total = res.data.pageData.total
          this.voteList.push(...res.data.pageData.list)
          if (res.data.pageData.list.length < this.maxCount) {
            this.isEnd = true
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
    getMore() {
      this.page++
      this.getList
    },
    scrollFun() {
      //判断滚动底部
      let ele = document.documentElement;
      let isScrollEnd = () => {
        let cHeight = ele.clientHeight
        let sHeight = ele.scrollHeight
        let sTop = ele.scrollTop
        if (sHeight - sTop <= cHeight + 10) {
          if(!this.isEnd){
            // this.showLoading = true;
            this.page++
            this.getList()
          }
        }
      }
      window.onscroll = this.throttle(isScrollEnd, 1000)
    },
    throttle(func, wait) {
      //节流函数
      let timeout;
      return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        }
      };
    },
  },
  beforeCreate() {
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
      this.maxCount = 10
    } else {
      this.maxCount = 15
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // this.scrollFun()
  }
}
</script>

<style lang="scss" scoped>
  #vote{
    width: 100%;
    max-width: 1230px;
    margin: 0 auto;

    #vote-footer{
      padding: .4rem 0;
      text-align: center;
      color: #fff;
      span{
        cursor: pointer;
      }
    }
  }
</style>