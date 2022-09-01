<template>
  <div class="device-container"> 
       <card :userIn="userInfo"></card> 
       <space-between></space-between>  
       <x-scroll :userIn="userInfo"></x-scroll>
       <down-load-buttom></down-load-buttom>
  </div>
</template>

<script>
import Card from '@/views/card/components/Card.vue'
import XScroll from '@/views/card/components/XScroll.vue'
import DownLoadButtom from '@/views/card/components/DownLoadButtom.vue'
import SpaceBetween from '@/views/card/components/SpaceBetween.vue'
import {  getCardInfo } from '@/utils/user.js'
import axios from 'axios'
export default {
  name:'Index',
  components:{
    Card,
    XScroll,
    DownLoadButtom,
    SpaceBetween,
  },
  data() {
    return  {
      // userInfo: {
      // userName: '郭龙飞',
      // userPosition: '高级业务经理',
      // userTel: '15194573039',
      // companyTel:'0379-65925902',
      // companyFax:'0379-65921702',
      // companyUrl: 'http://www.baidu.com',
      // companyName: '洛阳国宏投资控股集团有限公司',
      // companyEmail:'guolongfei@lyghjt.com',
      // companyInternet:'http://www.lyguohongtouzi.com',
      // companyAddress:'洛阳市洛龙区开元大道218号洛阳日报社报业集团6层',
      // },
      userInfo:{}
    }
  },
  created () {
    // this.getUserInfo()
    this.getJson()
  },
  methods:{
    //   async getUserInfo () {
    //   const { data } = await getCardInfo({
    //     methods:'get'
    //   })
    //   if(data.success){
    //     console.log(data)
    //   }
    // },
    async getJson() {
    let  data1  = await axios.get('/data.json')
    let { data }= data1 
     if(data.code === 200) {
       this.userInfo = data.data
       console.log()
     }
    }
    }
  }
</script>

<style lang="scss">
p,div{
   padding:0;
  margin:0;
  }
  .device-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #f3eeee;
  }
</style>