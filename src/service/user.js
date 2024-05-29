/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

import axios from '../utils/axios'

export function getUserInfo() {
  return axios.get('/user/info');
}

export function EditUserInfo(params) {
  return axios.put('/user/info', params);
}

export function login(params) {
  return axios.post('/user/login', params);
}

export function logout() {
  return axios.post('/user/logout')
}

export function register(params) {
  return axios.post('/user/register', params);
}

export async function uploadFile(file, type) {
  const formData = new FormData();
  formData.append('file', file); // 添加文件
  formData.append('type', type); // 添加类型，根据后端需求可能需要修改或移除

  try {
    const response = await axios.post('/user/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 如果接口需要认证信息，请在这里添加
        // 'Authorization': `Bearer ${yourToken}`,
      },
    });

    console.log('文件上传成功', response.data);
    return response.data; // 返回响应数据
  } catch (error) {
    console.error('上传过程中出现错误:', error);
    throw error; // 向调用者抛出错误
  }
}

export function getUser() {
  return axios.get('/user/get-user') // 修改为实际的API端点
      .then(response => {
        // 这里可以添加任何你需要的处理响应数据的逻辑
        return response.data; // 返回处理后的数据
      })
      .catch(error => {
        // 这里处理任何请求错误
        console.error('获取用户信息失败:', error);
        throw error; // 可以选择重新抛出错误或处理错误
      });
}



// 使用async关键字定义fetchUserInfo为异步函数
export async function fetchUserInfo() {
  try {
    // 调用getUserInfo函数发送请求并等待响应
    const response = await getUserInfo();
    // 如果请求成功，response将包含用户信息
    // 直接返回response.data以让调用者可以访问用户信息
    return response.data;
  } catch (error) {
    // 如果请求失败，控制台将输出错误信息，并抛出错误
    // 抛出错误让调用者可以捕获并处理这个错误
    console.error('Failed to fetch user info:', error);
    throw error;
  }
}


export const updateUsername = async (newUsername) => {
  // 假设使用axios
  const response = await axios.post('/user/updateUsername', { username: newUsername });
  return response;
};

export const updatePassword = async (currentPassword, newPassword, passwordConfirm) => {
  // 构造请求体

  const requestBody = {
    currentPassword: currentPassword,
    password: newPassword, // 确保这里也做了相应的更改
    passwordConfirm: passwordConfirm
  };

  // 发送 POST 请求到后端的密码更改接口
  const response = await axios.post('/user/change-password', requestBody);

  // 根据响应状态处理返回结果
  return response;
};

