<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { getUser } from '@/service/user';
import { ref, onMounted } from 'vue';

const onClickLeft = () => history.back();
const userInfo = ref([]);
const products = ref([]);

onMounted(async () => {
  try {
    const response = await getUser();
    userInfo.value = response;
    console.log('获取数据后立即打印:', userInfo.value);

    // 在确保获取到userInfo数据之后再构建products数组
    products.value = userInfo.value.map(item => ({
      desc: `上传时间: ${item.uploadTime}`,
      thumb: item.minioUrl,
      title: item.category === '1' ? '细胞' : '根长',
      tags: [`编号: ${item.imageNumber}`],
    }));
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
});
</script>

<template>
  <div>
    <van-nav-bar title="历史记录" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div v-for="(product, index) in products" :key="index">
      <van-card :desc="product.desc" :title="product.title" :thumb="product.thumb">
        <template #tags>
          <van-tag v-for="(tag, tagIndex) in product.tags" :key="tagIndex" plain type="primary">{{ tag }}</van-tag>
        </template>
      </van-card>
    </div>
    <NavBar/>
  </div>
</template>
