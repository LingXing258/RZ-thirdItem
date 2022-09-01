<!-- <template>
  <div class="device-container">
    <div class="paading-container">
      <div class="card-container" ref="card" id="card">
        <div class="card-header">
          <div class="card-header-left">
            <div class="card-header-left-top">
              <div class="card-header-left-top-left">
                <strong>{{name}}</strong>
             </div>
             <div class="card-header-left-top-right">
                 <p>高级业务经理</p>
             </div>
           </div>
          <div class="card-header-left-bottom">
             <p>Mob/151 9457 3039</p>
          </div>
        </div>
         <div class="card-header-right">
           <img src="@/assets/secondLogo.jpg" alt="">
        </div>
        </div>
        <div class="card-body">
          <div class="card-body-company-name">
           <p>洛阳国宏投资控股集团有限公司</p>
        </div>
         <div class="card-body-company-list">
         <div class="card-body-company-list-item-address" >
          <p><span>地址:</span>&nbsp;&nbsp;洛阳市洛龙区开元大道218号洛阳日报社报业集团6层</p>
         </div>
         <div class="card-body-company-list-item">
          <div class="card-body-company-list-item-tel space">
           <p> <span>电话:</span>&nbsp;&nbsp;<span class="text-indent">0379-65925902</span></p>
          </div>
          <div class="card-body-company-list-item-fax space">
           <p> <span>传真:</span>&nbsp;&nbsp;<span class="text-indent">0379-65921702</span></p>
         </div>
         </div>
         <div class="card-body-company-list-item-email space">
          <p><span class="sigin">E-mail:</span>&nbsp;&nbsp;guolongfei@lyghjt.com</p>
        </div>
        <div class="card-body-company-list-item-inter space">
          http://www.lyguohongtouzi.com
       </div>
        </div>
        </div>
        <div class="card-footer" ref="qrcode" @touchstart="toucherQrcode"></div>
        <div class="card-footer-enlarge" ref="qrcodeenlarge"></div>
        <div class="card-bottom-arrow"></div>
     </div>
    </div>
    <div class="hr">
     </div>
    <div class="x-scrllo-box">
      <div class="x-scrllo-box-inner">
      <div class="x-scrllo-box-inner-item" v-for="itemInfo in userInfo" :key="itemInfo.userName" @click="copy(itemInfo.userName,itemInfo.userValue)" ref="item">
      <div class="content-top"><i class="iconfont" v-html="itemInfo.userIcon"></i><div >{{itemInfo.userName}}&nbsp;</div></div>
       <div class="content-bottom">{{itemInfo.userValue}}</div>
      </div>
      </div>
      </div>
      <div class="footer-box"  @touchstart="longTimeTouch" id="down">
      <div class="footer-box-buttom" >
        <a>保存名片</a><i class="iconfont">&#xe8b0;</i>
      </div>
    </div>
    </div>
</template>
<script>
import html2canvas from 'html2canvas'
import QRCode from 'qrcodejs2'
import { ImagePreview } from 'vant'
import { getCardInfo } from '@/utils/user.js'
// import eruda from 'eruda'
export default {
  name: 'App',
  data () {
    return {
      name: '郭龙飞',
      position: '高级业务经理',
      companyName: '洛阳国宏投资控股集团有限公司',
      headerPicture: '',
      userUrl: 'http://www.baidu.com',
      userInfo: [
        { userName: '联系电话', userValue: '0379-65925902', userIcon: '&#x100bd;' },
        { userName: '邮箱', userValue: 'guolongfei@lyghjt.com', userIcon: '&#xe687;' },
        { userName: '网址', userValue: 'http://www.lyguohongtouzi.com', userIcon: '&#xe61f;' },
        { userName: '地址', userValue: '洛阳市洛龙区开元大道218号洛阳日报社报业集团6层', userIcon: '&#xe624;' }
      ],
      // userTelePhone: '13422098792',
      userTelePhone: '15218677715',
      imgurl: '',
      imglist: [],
      cardSrc: '',
      cardList: [],
      width:42,
      height:42,
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
    this.createQrCode()
    this.createQrCodeEnlarge()
  },
  computed: {
    gaptelephone: function () {
      if (!this.userTelePhone) {
        return undefined
      } else {
        const phoneReg = (/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/) //固定电话
        if (!(phoneReg.test(this.userTelePhone))) {
          const handleTele = (this.userTelePhone).replace(/^(.{3})(.{3})(.{3})(.*)$/, '$1 $2 $3 $4') //手机号处理
          console.log(handleTele)
          return handleTele
        } else {
          console.log(this.userTelePhone)
          return this.userTelePhone
        }
      }
    }
  },
  methods: {
    async getUserInfo () {
      const { data } = await getCardInfo({
        method: 'post',
        url: '/role/saveOrUpdate'
      })
      console.log(data)
    },
    toucherQrcode () {
      this.preventEventDoing = true
      this.imglist = []
      this.imglist.push(this.src)
       this.width=100
       this.height=100
      ImagePreview({
        images: this.imglist,
        showIndicators: false,
        showIndex: false,
        closeable: true,
        closeIconPosition: 'top-right',
        onClose:this.scale
      })
    },
    createQrCodeEnlarge() {
      const userurl = this.userUrl
      let width = 1000
      let height = 1000
      const qrcodeConfig = {
        text: userurl,
        // colorDark: '#333333', //二维码颜色
        // colorLight: '#ffffff', //二维码背景色
        width:width,
        height:height,
        // mSize: 0.3,
        // iconSrc:'@/assets/logo.png',
        correctLevel: QRCode.CorrectLevel.H  //容错率，L/M/H,
      }
      const qrcode = new QRCode(this.$refs.qrcodeenlarge, qrcodeConfig)
      this.src =qrcode._oDrawing._elCanvas.toDataURL('image/png')
    },
    createQrCode () {
      const userurl = this.userUrl
      let width = 42
      let height = 42
      const qrcodeConfig = {
        text: userurl,
        // colorDark: '#333333', //二维码颜色
        // colorLight: '#ffffff', //二维码背景色
        width:width,
        height:height,
        correctLevel: QRCode.CorrectLevel.H  //容错率，L/M/H,
      }
      const qrcode = new QRCode(this.$refs.qrcode, qrcodeConfig)
    },
    longTimeTouch () {
      html2canvas(this.$refs.card, {
        useCORS:true,//允许跨域
        backgroundColor:"rgba(0,0,0,.0)",//或者null，都代表透明
        scale: window.devicePixelRatio,
        dpi: 300,
        color: '#fffff',
        logging: false,
        width: this.$refs.card.offsetWidth,
        height: this.$refs.card.offsetHeight,
        scale: window.devicePixelRatio

      }).then(canvas => {
        const myBlob = this.dataURLtoBlob(canvas.toDataURL('img/png'))
        const myUrl = URL.createObjectURL(myBlob)
        this.downImg(myUrl) // 创建a标签，下载图片
      })
    },
    dataURLtoBlob (dataurl) {
     let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while (n--) {

     u8arr[n] = bstr.charCodeAt(n);

  }

  return new Blob([u8arr], { type: mime });

},
 downImg(url){

  // 创建a标签 并设置其相关属性，最后触发其点击事件
  // let b= document.getElementById('img')
  // b.src=url
    //      console.log(img1)
   const timestamp = Date.now().toString();
  var a = document.createElement("a")

  // let clickEvent = document.createEvent("MouseEvents");
  
  let clickEvent = document.createEvent("MouseEvents");
  a.setAttribute("href", url)
  a.setAttribute('id','aId')
  a.setAttribute("download", `${timestamp}.png`)

  a.setAttribute("target", '_blank')

  clickEvent.initEvent('click', true, true)

  a.dispatchEvent(clickEvent);
  
},
    // 这个方法会将渲染好的图片在新页面打开。
async copy(name,value) {
    this.show=true;
    try {
     await this.$dialog.confirm({ title: name, message: value })
        const success  = await this.$copyText(value)
        if(success) {
           this.$toast.success('复制成功')
        }else {
            this.$toast('复制失败')
        }
    }catch(e){
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
  .device-container .paading-container {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    background-color: #FFFFFF;;
  }
  .card-container{
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

.hr {
  width: 100%;
  height: 10px;
} 
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
.footer-box {
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* background-color: #FFFFFF; */
}
.footer-box .footer-box-buttom {
  width: 100%;
  height: 18px;
  padding: 15px 40px;
  border-radius: 50px;
  /* background-color: rgba(16, 31, 236, 0.914); */
  background-color: #0061B1;
  margin: 0px auto;
  justify-content:center;
  align-items: center;
  display: flex;
}
.footer-box .footer-box-buttom a {
  color: #ffffff;
}

.footer-box .footer-box-buttom i {
  color: #FFFFFF;
  margin-right: 3px;
}
</style> -->
