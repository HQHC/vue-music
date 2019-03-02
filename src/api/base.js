import jsonp from 'common/js/jsonp'
import {commonParam,options} from "./config";
import axios from 'axios'

export function jsonpRequest(url,param,option = options){

    const data = Object.assign({}, commonParam, param)
    
    return jsonp(url,data,option);
}


export function axiosRequest(url,param) {

  const data = Object.assign({}, commonParam, param);

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })

}