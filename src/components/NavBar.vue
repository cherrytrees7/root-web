<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <li class="nav-item" v-for="item in navItems" :key="item.path">
        <router-link :to="item.path" class="nav-link" exact-active-class="active">
          <span class="iconfont" :class="item.icon"></span>
          <span v-if="$route.path === item.path">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ref([
  { label: '首页', path: '/home', icon: 'icon-shouye' },
  { label: '记录', path: '/history', icon: 'icon-anli' },
  { label: '我的', path: '/user', icon: 'icon-wode' }
])
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: center; /* 居中导航条 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0; /* 确保导航条覆盖整个屏幕宽度 */
  background-color: white; /* 导航条背景色设置为白色 */
  border-top: 2px solid #e0e0e0; /* 在导航条顶部添加一条浅灰色边框 */
}



.nav-list {
  display: flex;
  justify-content: space-around; /* 在导航项之间平均分配空间 */
  list-style: none;
  padding: 0;
  margin: 0 auto; /* 居中列表 */
  width: 90%; /* 设置导航条宽度，根据需要调整 */
  max-width: 500px; /* 可以设置一个最大宽度，以防在大屏幕上导航项过宽 */
}

.nav-item {
  text-align: center;
  flex: 1; /* 确保所有导航项平均分配空间 */
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  text-decoration: none;
  color: grey; /* 默认文字颜色 */
}

.nav-link.active {
  color: skyblue; /* 选中状态的文字颜色 */
}

.nav-link.active .iconfont {
  fill: skyblue; /* 选中状态的图标填充颜色 */
}

.iconfont {
  font-size: 24px; /* 根据实际图标大小调整 */
}

</style>
