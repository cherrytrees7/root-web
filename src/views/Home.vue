<script setup lang="ts">
import { ref } from 'vue';
import NavBar from "@/components/NavBar.vue";
import { uploadFile } from '@/service/user';

const fileList = ref([]);
const uploadType = ref(''); // 用于存储当前的上传类型
const uploaderRef = ref(null);

const afterRead = async (file) => {
  console.log('afterRead called');
  const newFile = {
    url: URL.createObjectURL(file.file), // 本地预览URL, 初始时用于预览
    name: file.file.name,
    status: 'uploading',
    message: '上传中...',
  };

  fileList.value = [newFile]; // 先显示上传中的状态

  try {
    const uploadResult = await uploadFile(file.file, uploadType.value);
    console.log('------------')
    console.log(uploadResult)
    // 假设uploadResult是一个URL字符串，如果不是，需要从对象中提取
    // 例如，如果uploadResult是一个对象：const url = uploadResult.url;
    const url = typeof uploadResult === 'string' ? uploadResult : uploadResult.url;

    // 更新文件信息以反映上传成功
    newFile.status = 'done';
    newFile.message = '上传成功';
    newFile.url = url; // 使用从服务器返回的URL，替换为实际的文件URL
  } catch (error) {
    console.error('上传失败:', error);
    newFile.status = 'failed';
    newFile.message = '上传失败';
  } finally {
    fileList.value = [newFile]; // 仍然保持fileList只有一个元素，但已更新状态
  }
};


// 触发上传，并设置上传类型
const triggerUpload = (type) => {
  uploadType.value = type;
  const uploader = uploaderRef.value;
  if (uploader) {
    const input = uploader.$el.querySelector('input');
    if (input) {
      input.click();
    }
  }
};
</script>


<template>
  <div class="container">
    <div class="uploader-container">
      <van-uploader v-model="fileList" ref="uploaderRef" accept="image/*" :after-read="afterRead" :max-count="1" :preview-size="[200, 200]"></van-uploader>
    </div>
    <div class="button-container"> <!-- 添加按钮容器 -->
      <van-button type="primary" @click="triggerUpload('1')">上传细胞</van-button>
      <van-button type="info" @click="triggerUpload('2')">上传主根</van-button>
    </div>
    <NavBar/>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 这将确保子项在容器中垂直居中 */
  height: 100vh; /* 这里假设您想要让容器填满整个视口高度 */
}

.uploader-container {
  display: flex;
  flex-direction: row; /* 修改这里使按钮左右排列 */
  align-items: center;
  justify-content: center; /* 确保上传组件和按钮在其容器中居中 */
  gap: 10px; /* 可以添加一点间隔使得按钮之间有一定空隙 */
}
</style>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.uploader-container {
  /* 保持这个容器默认样式，确保 uploader 在上方 */
}

.button-container {
  display: flex;
  flex-direction: row; /* 使按钮左右排列 */
  align-items: center;
  justify-content: center;
  gap: 10px; /* 两个按钮之间的间距 */
}

</style>

