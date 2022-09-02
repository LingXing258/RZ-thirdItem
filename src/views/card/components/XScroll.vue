<template>
  <div class="x-scrllo-box">
      <div class="x-scrllo-box-inner">

      <div class="x-scrllo-box-inner-item"  @click="copy( userkey.userTelKey,userIn.userTel)" ref="item">
       <div class="content-top"><i class="iconfont" >&#x100bd;</i><div >联系电话&nbsp;</div></div>
       <div class="content-bottom">{{userIn.userTel || '&nbsp;'}}</div>
      </div>

      <div class="x-scrllo-box-inner-item"  @click="copy(userkey.userEmailKey,userIn.companyEmail)" ref="item">
       <div class="content-top"><i class="iconfont">&#xe687;</i><div >邮箱&nbsp;</div></div>
       <div class="content-bottom">{{userIn.companyEmail || '&nbsp;'}}</div>
      </div>

       <div class="x-scrllo-box-inner-item"  @click="copy(userkey.userIntelKey,userIn.companyUrl)" ref="item">
       <div class="content-top"><i class="iconfont">&#xe61f;</i><div >网址&nbsp;</div></div>
       <div class="content-bottom">{{userIn.companyUrl || '&nbsp;'}}</div>
      </div>

      <div class="x-scrllo-box-inner-item"  @click="copy(userkey.userAddressKey,userIn.companyAddress)" ref="item">
       <div class="content-top"><i class="iconfont" >&#xe624;</i><div >地址&nbsp;</div></div>
       <div class="content-bottom">{{userIn.companyAddress || '&nbsp;'}}</div>
      </div>

      </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      userkey: {
        userTelKey: '联系电话',
        userEmailKey: '邮箱',
        userIntelKey: '网址',
        userAddressKey: '地址'
      }
    }
  },
  methods: {
    async copy (name, value) {
      this.show = true
      try {
        await this.$dialog.confirm({ title: name, message: value })
        const success = await this.$copyText(value)
        if (success) {
          this.$toast.success('复制成功')
        } else {
          this.$toast('复制失败')
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  props: {
    userIn: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
 .x-scrllo-box {
   position: relative;
   height: 100px;
   width: 100%;
   overflow-x: auto;
   overflow-y: hidden;
   background-color: #FFFFFF;
 }
.x-scrllo-box  .x-scrllo-box-inner{
   position: relative;
   box-sizing: border-box;
   padding: 10px 10px 0 10px;
   width: 165%;
   border: 0px;
   height: 100%;
     }
.x-scrllo-box .x-scrllo-box-inner::after {
   position: absolute;
    content: '';
    height: 10px;
    display: block;
    bottom: 0px;
    width: 100%;
    left: 0;
    background-color: #f3eeee;
  }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item {
   float: left;
   width: 23.3%;
   box-sizing: border-box;
   margin-right: 10px;
   border-radius:6px;
   display: flex;
   flex-direction: column;
   padding: 12px 5px 16px 10px;
   -moz-box-shadow:1px 2px 8px rgba(0,0,0,0.7);
   -webkit-box-shadow:1px 2px 8px rgba(0,0,0,0.7);
   box-shadow:1px 1px 4px rgba(0,0,0,0.4);
   background-color: #ffff;
     }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:last-child{
     margin-right: 0px;
     }
.x-scrllo-box::-webkit-scrollbar {
     background-color: #f3eeee;
     color: #f3eeee;;
     }
 .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item .content-top{
       display: flex;
       flex-direction: row;
       padding-bottom: 6px;
       align-items: center;
       }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item .content-top div {
         margin-left: 5px;
        transform: scale(1,1);
         }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:nth-child(1) i{
color: rgb(35, 126, 223);
 }
   .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:nth-child(2) i{
    color: rgb(240, 96, 19);
 }
   .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:nth-child(3) i{
color: rgb(77, 42, 165);
 }  .x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item:nth-child(4) i{
  color: rgb(40, 109, 58);
 }
.x-scrllo-box .x-scrllo-box-inner .x-scrllo-box-inner-item .content-bottom {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
      color: rgba(0, 0, 0, 0.8);
        transform: scale(1,1);
   }
</style>
