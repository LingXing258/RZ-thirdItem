export default function getParameter (name) {
  const locUrl = window.location.search.substr(1)
  const aryParams = locUrl.split('&')
  let rtn = ''
  for (let i = 0; i < aryParams.length; i++) {
    const pair = aryParams[i]
    const aryEnt = pair.split('=')
    const key = aryEnt[0]
    const val = aryEnt[1]
    if (key !== name) continue
    if (rtn === '') {
      rtn = decodeURI(val)
    } else {
      rtn += ',' + val
    }
  }
  return rtn
}
