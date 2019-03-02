import {jsonpRequest,axiosRequest} from './base'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const param = {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  }
  return jsonpRequest(url,param);
}

export function getDiscList() {
  const url = '/api/getDiscList'

  const param = {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  }

  return axiosRequest(url,param);

}
