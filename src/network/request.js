import Axios from "axios"

export function request(config) {
  const instance = Axios.create({
    baseURL: 'http://123.207.32.32:8000/api/hy',
    // baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 200000000 //开发使用
  })
  instance.interceptors.request.use(
    config => {
    return config
  }, error => {
    return error
  })
  instance.interceptors.response.use(
    response => {
      // 因为这里的接口是两层data，所以拦截过滤一下
      return response.data
  }, error => {
      return error
  })
  return instance(config)
}
