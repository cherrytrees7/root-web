/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */
 import axios from 'axios'
 import { showToast, showFailToast } from 'vant'
 import { setLocal } from '@/common/js/utils'
 import router from '../router'

 console.log('import.meta.env', import.meta.env)

 axios.defaults.baseURL = 'http://localhost:3000'
 axios.defaults.withCredentials = true
const token = localStorage.getItem('token') || '';

// 设置 Authorization 头部
// 确保它遵循后端期望的 'Bearer <token>' 格式
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

// 设置默认的 POST 请求内容类型
axios.defaults.headers.post['Content-Type'] = 'application/json';
 // axios.interceptors.response.use(res => {
 //   if (typeof res.data !== 'object') {
 //    showFailToast('服务端异常！')
 //     return Promise.reject(res)
 //   }
 //   if (res.data.resultCode != 200) {
 //     if (res.data.message) showFailToast(res.data.message)
 //     if (res.data.resultCode == 416) {
 //       router.push({ path: '/login' })
 //     }
 //     if (res.data.data && window.location.hash == '#/login') {
 //       setLocal('token', res.data.data)
 //       axios.defaults.headers['token'] = res.data.data
 //     }
 //     return Promise.reject(res.data)
 //   }
 //
 //   return res.data
 // })

axios.interceptors.response.use(
    response => {
        // 检查响应中的code是否表示成功
        if (response.data.code === 200) {
            // 请求成功
            return response.data;
        } else {
            // 请求未成功，显示错误消息并拒绝promise
            showFailToast(response.data.message || '未知错误');
            return Promise.reject(response.data);
        }
    },
    error => {
        // 处理网络或其他技术错误
        showFailToast(error.message || '网络异常');
        return Promise.reject(error);
    }
);


 export default axios
