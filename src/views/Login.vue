<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->



<template>
  <div class="login">
    <s-header :key="componentKey" :name="state.type == 'login' ? '登录' : '注册'" />
    <img class="logo" src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" alt="" style="visibility: hidden;">>
    <div v-if="state.type == 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="state.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="state.verify"
        >
          <template #button>
            <vue-img-verify ref="verifyRef" />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button round block color="#1baeae" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="state.username1"
          name="username1"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="state.passwordConfirm"
            type="password"
            name="passwordConfirm"
            label="确认密码"
            placeholder="再次输入密码"
            :rules="[{ required: true, message: '请再次填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="state.verify"
        >
          <template #button>
            <vue-img-verify ref="verifyRef" />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button round block color="#1baeae" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import sHeader from '@/components/SimpleHeader.vue'
import vueImgVerify from '@/components/VueImageVerify.vue'
import { login, register } from '@/service/user'
import { setLocal } from '@/common/js/utils'
import md5 from 'js-md5'
import { showSuccessToast, showFailToast } from 'vant'
const verifyRef = ref(null)
const state = reactive({
  username: '',
  password: '',
  username1: '',
  password1: '',
  passwordConfirm: '',
  type: 'login',
  imgCode: '',
  verify: ''
})

const componentKey = ref(0)

function forceUpdate() {
  componentKey.value++ // 每次调用时增加key的值
}

// 切换登录和注册两种模式
const toggle = (v) => {
  state.type = v
  state.verify = ''
}

// 提交登录或注册表单
const onSubmit = async () => {
  // 验证码校验
  state.imgCode = verifyRef.value.state.imgCode || '';
  if (state.verify.toLowerCase() !== state.imgCode.toLowerCase()) {
    showFailToast('验证码有误')
    return;
  }

  // 登录逻辑
  if (state.type === 'login') {
    try {
      const { data } = await login({
        userName: state.username,
        password: md5(state.password),
        passwordConfirm:md5(state.password)
      });
      setLocal('token', data);
      showSuccessToast('登录成功');
      // 登录成功后的页面跳转或状态更新
      window.location.href = '/';
    } catch (error) {
      // 处理登录失败的情况
      showFailToast(error.response.data.message || '登录失败');
    }
  }
  // 注册逻辑
  else if (state.type === 'register') {
    // 注册前的密码一致性校验
    if (state.password1 !== state.passwordConfirm) {
      showFailToast('两次输入的密码不一致');
      return;
    }
    try {
      // 构建注册请求的数据对象
      const registerData = {
        userName: state.username1, // 对应 UserVo 中的 userName 字段
        password: md5(state.password1), // 对应 UserVo 中的 password 字段，使用 MD5 加密
        passwordConfirm: md5(state.passwordConfirm) // UserVo 中的 passwordConfirm 字段也使用 MD5 加密
      };

      // 调用注册接口，传递 registerData 对象
      await register(registerData);

      state.username = state.username1; // 填充用户名到登录表单
      state.password = ''; // 清空密码
      state.username1 = ''; // 清空注册表单用户名
      state.password1 = ''; // 清空注册表单密码
      state.passwordConfirm = ''; // 清空确认密码
      state.verify = ''; // 清空验证码
      showSuccessToast('注册成功');

      // 注册成功后处理逻辑
      // 清空表单数据，并切换到登录界面

    } catch (error) {
      console.error(error);
      // 处理注册失败的逻辑
      showFailToast(error.message || '注册失败');
    }

  }
};


</script>

<style lang="less">
  .login {
    .logo {
      width: 120px;
      height: 120px;
      display: block;
      margin: 80px auto 20px;
    }
    .login-body {
      padding: 0 20px;
    }
    .login {
      .link-register {
        font-size: 14px;
        margin-bottom: 20px;
        color: #1989fa;
        display: inline-block;
      }
    }
    .register {
      .link-login {
        font-size: 14px;
        margin-bottom: 20px;
        color: #1989fa;
        display: inline-block;
      }
    }
    .verify-bar-area {
      margin-top: 24px;
      .verify-left-bar {
        border-color: #1baeae;
      }
      .verify-move-block {
        background-color: #1baeae;
        color: #fff;
      }
    }
    .verify {
      >div {
        width: 100%;
      }
      display: flex;
      justify-content: center;
      .cerify-code-panel {
        margin-top: 16px;
      }
      .verify-code {
        width: 40%!important;
        float: left!important;
      }
      .verify-code-area {
        float: left!important;
        width: 54%!important;
        margin-left: 14px!important;
        .varify-input-code {
          width: 90px;
          height: 38px!important;
          border: 1px solid #e9e9e9;
          padding-left: 10px;
          font-size: 16px;
        }
        .verify-change-area {
          line-height: 44px;
        }
      }
    }
  }
</style>
