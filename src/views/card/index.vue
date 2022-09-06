<template>
  <div class="device-container">
       <card :userInfo="userInfo"></card>
       <space-between></space-between>
       <x-scroll :userIn="userInfo"></x-scroll>
       <down-load-buttom :tel="userInfo.userTel"></down-load-buttom>
  </div>
</template>

<script>
import Card from '@/views/card/components/Card.vue'
import XScroll from '@/views/card/components/XScroll.vue'
import DownLoadButtom from '@/views/card/components/DownLoadButtom.vue'
import SpaceBetween from '@/views/card/components/SpaceBetween.vue'
import getParameter from '@/utils/util'
import { getUserInfo } from '@/service/userService.js'
import { Toast } from 'vant'

export default {
  name: 'Index',
  components: {
    Card,
    XScroll,
    DownLoadButtom,
    SpaceBetween
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getUserInfo(getParameter('userId')).then(resp => {
        const data = resp.data;
        const success = resp.success;
        console.log(data)
        if (!success) {
          Toast.fail('服务端异常！')
          return
        }
        this.userInfo = data
      })
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