import axios from 'axios'

export function fetch(url, method = 'GET', params) {

  // $.showPreloader();

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: G_SERVER_URL + url,
      headers: {
      },
      data: params
    })
    .then((response) => {

      // $.hidePreloader();

      resolve(response.data)

    })
    .catch((error) => {

      // $.hidePreloader();

      // if(error.response.status == 500) return $.alert('系统发生偶然错误！');

      reject(error)
    })
  })
}

export default {

    // 测试用的
    getHomeIndex(){
      return fetch('/')
    }

}