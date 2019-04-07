import axios from 'axios'
const baseURL = 'http://localhost:8888/api/private/v1'
axios.defaults.baseURL = baseURL
// 登陆验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('myToken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 获取用户列表
export const getUserList = params => {
  // users 代表请求路径 /users
  return axios.get('users', params).then(res => res.data)
}
// 改变用户状态
export const changeUserState = params => {
  // ES6语法
  return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data)
}
// 新增用户
export const addUser = params => {
  return axios.post('users', params).then(res => res.data)
}
// 获取用户
export const getUserById = params => {
  return axios.get(`users/${params}`).then(res => res.data)
}
// 编辑用户
export const editUser = params => {
  return axios.put(`users/${params.id}`, params).then(res => res.data)
}
// 删除用户
export const deleteUser = params => {
  return axios.delete(`users/${params}`).then(res => res.data)
}
// 获取角色列表
export const getRoleList = params => {
  return axios.get('roles').then(res => res.data)
}
// 分配角色
export const grantUserRole = params => {
  return axios.put(`users/${params.id}/role`, {id: params.id, rid: params.rid}).then(res => res.data)
}
