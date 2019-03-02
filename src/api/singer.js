import {jsonpRequest,axiosRequest} from './base'

export function getSingerList(index) {

    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  
    const param = {
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      data: {
        "comm":{"ct":24,"cv":10000},
        "singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":index,"sin":0,"cur_page":1}}}
    }
    
  
  
    return jsonpRequest(url, param, {
      param: ['jsonpCallback','callback'],
      prefix: 'getUCGI',
      name: Math.trunc(Math.random() * 10000000000000)
    })
  }

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const param = {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  }

  return jsonpRequest(url, param, {
    param: ['jsonpCallback','callback'],
    prefix: 'getSingerDetail',
    name: Math.trunc(Math.random() * 10000000000000)
  })
}

export function getPlaySongvkey(songmid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  const param = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    data: {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"9274582244","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"9274582244","songmid":[songmid],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}
  }

  return jsonpRequest(url, param, {
    param: ['jsonpCallback','callback'],
    prefix: 'getPlaySongvkey',
    name: Math.trunc(Math.random() * 10000000000000)
  })
}


