<template>
    <div class="paading-container">
        <div class="card-container" ref="card">
        <div class="card-header">
          <div class="card-header-left">
            <div class="card-header-left-top">
              <div class="card-header-left-top-left">
                <strong>{{userInfo.userName}}</strong>
             </div>
             <div class="card-header-left-top-right">
                 <p>{{userInfo.userPosition}}</p>
             </div>
           </div>
          <div class="card-header-left-bottom">
             <p>Mob/{{gaptelephone}}</p>
          </div>
        </div>
         <div class="card-header-right">
           <img src="@/assets/logo.jpg" alt="">
        </div>
        </div>
        <div class="card-body">
          <div class="card-body-company-name">
           <p>{{userInfo.companyName}}</p>
        </div>
         <div class="card-body-company-list">
         <div class="card-body-company-list-item-address" >
          <p><span>地址:</span>&nbsp;{{userInfo.companyAddress}}</p>
         </div>
         <div class="card-body-company-list-item">
          <div class="card-body-company-list-item-tel space">
           <p> <span>电话:</span>&nbsp;<span class="text-indent">{{userInfo.companyTel}}</span></p>
          </div>
          <div class="card-body-company-list-item-fax space">
           <p> <span>传真:</span>&nbsp;<span class="text-indent">{{userInfo.companyFax}}</span></p>
         </div>
         </div>
         <div class="card-body-company-list-item-email space">
          <p><span class="sigin">E-mail:</span>&nbsp;{{userInfo.companyEmail}}</p>
        </div>
        <div class="card-body-company-list-item-inter space">
           {{userInfo.companyUrl}}
       </div>
        </div>
        </div>
        <div class="card-footer" ref="qrcode" @touchstart="toucherQrcode"></div>
        <div class="card-footer-enlarge" ref="qrcodeenlarge"></div>
        <div class="card-bottom-arrow"></div>
      </div>
    </div>
</template>

<script>
// import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
import { ImagePreview } from 'vant'
import emitter from '@/utils/mitt.js'
export default {
  name: 'App',
  data () {
    return {
      imgurl: '',
      imglist: [],
      cardSrc: '',
      cardList: []
    }
  },
  created () {
    // this.getUserInfo()
  },
  props: {
    userInfo: {
      typeof: Object
    }
  },
  mounted () {
    this.loadQrcode()
    //this.getCardRef()
  },
  computed: {

    gaptelephone: function () {
      if (!this.userInfo.userTel) {
        return undefined
      } else {
        const phoneReg = (/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/) // 固定电话
        if (!(phoneReg.test(this.userInfo.userTel))) {
          const handleTele = (this.userInfo.userTel).replace(/^(.{3})(.{3})(.{3})(.*)$/, '$1 $2 $3 $4') // 手机号处理
          console.log(handleTele)
          return handleTele
        } else {
          console.log(this.userInfo.userTel)
          return this.userInfo.userTel
        }
      }
    }
  },
  methods: {
    getCardRef () {
      emitter.emit('CardRef', this.$refs.card)
    },
    loadQrcode() {
      if (this.userInfo.companyInternet) {
        this.createQrCode()
        this.createQrCodeEnlarge()
        return
      }
      const _this = this
      setTimeout(function () {
        _this.loadQrcode()
      }, 500)
    },
    toucherQrcode () {
      this.preventEventDoing = true
      this.imglist = []
      this.imglist.push(this.src)
      this.width = 100
      this.height = 100
      ImagePreview({
        images: this.imglist,
        showIndicators: false,
        showIndex: false,
        closeable: true,
        closeIconPosition: 'top-right',
        onClose: this.scale
      })
    },
    createQrCodeEnlarge () {
      const userurl = this.userInfo.companyInternet || ''
      const width = 1000
      const height = 1000
      const qrcodeConfig = {
        text: userurl,
        // colorDark: '#333333', //二维码颜色
        // colorLight: '#ffffff', //二维码背景色
        width: width,
        height: height,
        // mSize: 0.3,
        // iconSrc:'@/assets/logo.png',
        correctLevel: QRCode.CorrectLevel.H // 容错率，L/M/H,
      }
      const qrcode = new QRCode(this.$refs.qrcodeenlarge, qrcodeConfig)
      this.src = qrcode._oDrawing._elCanvas.toDataURL('image/png')
    },
    createQrCode () {
      const userurl = this.userInfo.companyInternet || ''
      console.log(userurl)
      const width = 42
      const height = 42
      const qrcodeConfig = {
        text: userurl,
        // colorDark: '#333333', //二维码颜色
        // colorLight: '#ffffff', //二维码背景色
        width: width,
        height: height,
        correctLevel: QRCode.CorrectLevel.H // 容错率，L/M/H,
      }
      new QRCode(this.$refs.qrcode, qrcodeConfig)
    },
    dataURLtoBlob (dataurl) {
      const arr = dataurl.split(','); const mime = arr[0].match(/:(.*?);/)[1]; const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new Blob([u8arr], { type: mime })
    },
    downImg (url) {
      // 创建a标签 并设置其相关属性，最后触发其点击事件
      // let b= document.getElementById('img')
      // b.src=url
      //      console.log(img1)
      const timestamp = Date.now().toString()
      const a = document.createElement('a')

      // let clickEvent = document.createEvent("MouseEvents");

      const clickEvent = document.createEvent('MouseEvents')
      a.setAttribute('href', url)
      a.setAttribute('id', 'aId')
      a.setAttribute('download', `${timestamp}.png`)

      a.setAttribute('target', '_blank')

      clickEvent.initEvent('click', true, true)

      a.dispatchEvent(clickEvent)
    },
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
  }
}
</script>

<style lang="scss" scoped>
.paading-container {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    background-color: #FFFFFF;;
  }
.card-container{
     background-color: #FFFFFF;;
     position: relative;
     border: 1px solid rgba(0,0,0,0.1);
     box-sizing: border-box;
     padding: 10px 15px;
  }
  .card-container .card-header{
    justify-content: space-between;
     box-sizing: border-box;
     display: flex;
     width: 100%;
     align-items: center;
  }
  .card-container .card-header .card-header-left {
    flex-direction: column;
    display: flex;
    flex: 1;
  }
  .card-container .card-header .card-header-left .card-header-left-top {
    justify-content: start;
    align-items: center;
    display: flex;
    flex: 1;
  }
  .card-container .card-header .card-header-left .card-header-left-top .card-header-left-top-left strong{
    padding-right: 10px;
    font-size: 20px;
    font-family: 'siyuansongti'
  }
  .card-container .card-header .card-header-left .card-header-left-bottom {
    padding: 0 15px;
    flex: 1;
  }
  .card-container .card-header .card-header-right {
    width: 50px;
  }
  .card-container .card-header .card-header-right img{
    width: 100%;
  }
  .card-container .card-body {
    padding-top:23px;
  }
  .card-container .card-body  .card-body-company-name {
    margin-right: 20%;
    padding-bottom: 5px;
    border-bottom: 1px solid black ;
    margin-bottom: 7px;
    letter-spacing: 1px;
  }
  .card-container .card-body .card-body-company-list {
    font-size: 8.5px;
    padding-right:36px;
    padding-bottom:6px;
  }
  .card-container .card-body .card-body-company-list .card-body-company-list-item{
   display: flex;
  }
  .card-container .card-body .card-body-company-list p{
    box-sizing: border-box;
    padding: 1.2px 0;
  }
  .card-container .card-body .card-body-company-list p .text-indent{
   display: inline-block;
  }
  .card-container .card-body .card-body-company-list .card-body-company-list-item-address{
    box-sizing: border-box;
    word-break: break-all;
  }
  .card-container .card-body .card-body-company-list .card-body-company-list-item-tel {
    padding-right: 7px;
  }
  .card-container .card-body .card-body-company-list .card-body-company-list-item-email{
    box-sizing: border-box;
    word-break: break-all;
    padding-right: 45px;
  }
  .card-container .card-body .card-body-company-list .card-body-company-list-item-inter{
    box-sizing: border-box;
    word-break: break-all;
    padding-right: 45px;
  }
  .card-container .card-footer{
    position: absolute;
    bottom: 7px;
    right: 15px;
    width: 44px;
    height: 44px;
    box-sizing: border-box;

  }
  .card-container  .card-footer-enlarge {
  position: fixed !important ;
  left: 9999px !important;
}
  .card-container .card-footer img{
    width: 100%;
    height: 100%;
    padding: 1px;
  }
  .card-container .card-bottom-arrow {
   position: absolute;
   width: 47%;
   height: 12px;
   background-color: #0061B1;
   bottom: 0;
   left: 0;
  }
  .card-container .card-bottom-arrow::after {
   position: absolute;
   content: '';
   display: block;
   border: 6.0px solid #0061B1;
   right: -12px;
   border-bottom-color: transparent;
   border-right-color: transparent;
  }

</style>
