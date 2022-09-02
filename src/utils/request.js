import axios from 'axios'
import { Toast } from 'vant'

axios.defaults.isDev = false
axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  return res.data
})

export default axios
