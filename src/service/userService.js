import axios from '@/utils/request'
export const getUserInfo = function (userId) {
  return axios.get('/weixin/user/user-info.ht?userId=' + userId)
}
