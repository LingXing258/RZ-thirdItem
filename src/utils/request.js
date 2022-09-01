import axios from 'axios'
const instance = axios.create({
    baseURL:'http://localhost:8089/weixin/user/me.ht?userId=10000034194053'
})
export default instance