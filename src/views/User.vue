<script setup>
import sHeader from '@/components/SimpleHeader.vue'
import { useRouter } from 'vue-router';
import 'vant/es/cell/style';
import 'vant/es/cell-group/style';
import 'vant/es/button/style';
import 'vant/es/dialog/style';
import {ref, onMounted} from 'vue';
import NavBar from "@/components/NavBar.vue";
import {Cell, CellGroup, Button, showConfirmDialog} from 'vant';
import {fetchUserInfo, updateUsername,updatePassword } from '@/service/user'
import {showSuccessToast, showFailToast,allowMultipleToast} from 'vant'
import { closeToast } from 'vant';
import {setLocal,removeLocal} from '@/common/js/utils';
import { Toast } from "vant";
const componentKey = ref(0);
const formKey = ref(0);

const isPasswordFormShown = ref(false); // 控制密码修改表单的显示状态
const originalPassword = ref(''); // 用户输入的原密码
const newPassword = ref(''); // 用户输入的新密码
const confirmPassword = ref(''); // 用户确认的新密码

allowMultipleToast()
const router = useRouter();

const togglePasswordForm = () => {
  isPasswordFormShown.value = !isPasswordFormShown.value;
};

// 检查两次输入的新密码是否一致


const isInputShown = ref(false); // 控制输入框显示状态
const toggleInput = () => {
  isInputShown.value = !isInputShown.value; // 切换输入框显示状态
};

// 假设这是用户信息

const userInfo = ref({
  username: ''
});

// 修改用户信息的方法
onMounted(async () => {
  try {
    const data = await fetchUserInfo(); // 此处假设data是直接返回的用户名字符串
    userInfo.value.username = data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
});
// 修改密码的方法，这里仅作为示例，你可能需要实现实际的逻辑



const submitChangePassword = async () => {

  // 验证新密码和确认密码是否一致
  if (newPassword.value !== confirmPassword.value) {
    closeToast();
    showFailToast('两次输入的新密码不一致');
    return ;
  }


  try {


    // 调用更新密码的API
    const response = await updatePassword(originalPassword.value, newPassword.value, confirmPassword.value);

    // 根据响应码判断操作是否成功
    if (response.code === 200) {
      closeToast();
      showSuccessToast('密码修改成功');
      // 这里可以添加更多成功后的操作，比如页面跳转等
    }
  } catch (error) {
    showFailToast(error.response.data.message || '修改失败');
  }
};



// 用户退出的方法，使用 showConfirmDialog
const logout = () => {
  showConfirmDialog({
    title: '确认',
    message: '确定要退出登录吗？',
  })
      .then(() => {
        // 执行退出登录逻辑
        removeLocal('token'); // 假设你的 token 存储在 localStorage 的 'token' 键下
        console.log('用户已退出');
        router.push('/login'); // 使用 router 实例导航到登录页面
      })
      .catch(() => {
        // 取消退出
        console.log('取消退出');
      });
};

const updateUserInfo = async (newUsername) => {
  try {
    // 调用后端接口更新用户名
    const result = await updateUsername(newUsername);
    // 假设成功的状态码是200
    if (result.code === 200) {
      // 更新成功，可以重新获取用户信息或直接更新userInfo
      userInfo.value.username = newUsername;
      componentKey.value++;
      setLocal('token', result.data);
      closeToast();
      showSuccessToast('修改用户名成功');
    } else {
      // 处理更新失败的情况
      console.log('用户名更新失败', result.message);
    }
  } catch (error) {
    closeToast();
    showFailToast(error.response.data.message || '修改失败');
  }
};


// 绑定到输入框的确定按钮上
const confirmUsernameChange = () => {
  updateUserInfo(userInfo.value.username);
  toggleInput(); // 关闭输入框
};

</script>


<template>
  <div class="content-area" :key="componentKey">
<!--    <s-header name="个人信息"></s-header>-->
    <div class="centered-container">
      <van-cell-group inset>
        <van-cell title="修改用户名" size="large" is-link :value="userInfo.username"
                  :arrow-direction="isInputShown ? 'down' : 'right'" @click="toggleInput"/>

        <!-- 根据 isInputShown 来显示或隐藏输入框 -->
        <div v-if="isInputShown" class="input-container">
          <van-field v-model="userInfo.username" placeholder="请新输入用户名" @click.native.stop/>
          <van-button type="info" block @click="confirmUsernameChange">确定</van-button>
        </div>

        <!-- 修改密码 Cell -->
        <van-cell title="修改密码" size="large" is-link @click="togglePasswordForm"
                  :arrow-direction="isPasswordFormShown ? 'up' : 'down'"/>

        <!-- 修改密码表单，包含输入原密码、两次新密码 -->
        <div v-if="isPasswordFormShown" class="password-form" :key="formKey">
          <van-field v-model="originalPassword" placeholder="请输入原密码" type="password"/>
          <van-field v-model="newPassword" placeholder="请输入新密码" type="password"/>
          <van-field v-model="confirmPassword" placeholder="请确认新密码" type="password"/>
          <van-button type="info" block @click="submitChangePassword">修改密码</van-button>
        </div>
      </van-cell-group>
    </div>
    <div class="logout-button-container">
      <Button type="danger" block class="button-logout" @click="logout">退出登录</Button>
    </div>
    <div class="nav-bar-container">
      <NavBar/>
    </div>
  </div>
</template>


<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 20px 0;
  width: 100%; /* 确保容器宽度为 100% */
}

/* 确保 CellGroup 和 Cell 铺满屏幕宽度 */
.van-cell-group, .van-cell {
  width: 100%;
}

.content-area {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px); /* 根据底部固定元素的高度调整 */
  justify-content: space-between;
  padding: 0; /* 移除左右内边距 */
}

.logout-button-container, .nav-bar-container {
  position: fixed;
  left: 0;
  right: 0;
}

.logout-button-container {
  bottom: 60px;
  z-index: 101;
}

.nav-bar-container {
  bottom: 0;
  z-index: 100;
}

.logout-button-container {
  margin-bottom: 20px;
}
</style>


