const baseUrl = 'https://www.cxysl.cn/project_api/';
//  http://localhost:8080/project_api/
//  https://www.cxysl.cn/project_api/
const request = (url, data, method) => {

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-token': 'x-token'  // 看自己是否需要
      },
      success(res) {
        if (res.data.code == 100000) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail(err) {
        reject(err.data)
      }
    })
  })
}

const query = (url, data = {}) => {
  return request(url, data, 'GET')
}

const post = (url, data = {}) => {
  return request(url, data, 'POST')
}

const put = (url, data = {}) => {
  return request(url, data, 'PUT')
}
// 不能声明DELETE（关键字）
const remove = (url, data = {}) => {
  return request(url, data, 'DELETE')
}

module.exports = {
  query,
  post,
  put,
  remove
}