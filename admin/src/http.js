import axios from 'axios'
import Vue from 'vue'
import router from './router'



const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/api'
    // baseURL: 'http://localhost:3000/admin/api/'
})

// 全局请求拦截，添加验证 Headers
http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 全局错误响应拦截
http.interceptors.response.use(res => {
    return res
}, err => {
    // element-ui 提示错误讯息
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: "error",
            message: err.response.data.message
        })
    }

    if (err.response.status === 401) {
        router.push('/login')
    }

    return Promise.reject(err)
})


export default http