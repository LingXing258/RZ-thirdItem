<template>
   <div class="footer-box"  @touchstart="longTimeTouch" id="down">
      <div class="footer-box-buttom" >
        <a>保存名片</a><i class="iconfont">&#xe8b0;</i>
      </div>
    </div>
</template>

<script>
import emitter from '@/utils/mitt.js'
import html2canvas from 'html2canvas'
export default {
  name: 'DownLoadButtom',
  data () {
    return {
      recentcardRef: ''
    }
  },
  created () {
    this.recentCardRef()
  },
  methods: {
    recentCardRef () {
      const that = this
      emitter.on('CardRef', function (reqest) {
        that.recentcardRef = reqest
        // console.log(that.recentcardRef,11)
      })
    },
    longTimeTouch () {
      html2canvas(this.recentcardRef, {
        useCORS: true, // 允许跨域
        backgroundColor: 'rgba(0,0,0,0)', // 或者null，都代表透明
        scale: window.devicePixelRatio,
        dpi: 300,
        color: '#fffff',
        logging: false
      //   width: this.$refs.card.offsetWidth,
      //   height: this.$refs.card.offsetHeight,
      }).then(canvas => {
        const myBlob = this.dataURLtoBlob(canvas.toDataURL('img/png'))
        const myUrl = URL.createObjectURL(myBlob)
        this.downImg(myUrl) // 创建a标签，下载图片
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
