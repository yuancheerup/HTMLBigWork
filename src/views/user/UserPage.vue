<template>
  <div class="user-info">
    <!-- 第一部分：用户头像，用户名，客服 -->
    <div class="user-header" :style="{ backgroundImage: `url(${headerBgPath})` }">
      <div class="user-avatar" @click="toLogin()">
        <img :src="avatarPath" alt="用户头像" />
        <div class="username">{{ username }}</div>
      </div>
      <van-button plain type="primary" class="customer-service">客服</van-button>
    </div>

    <!-- 第二部分：统计数据，我的订单，我的消息，桌面组件 -->
    <van-cell-group class="user-info-section">
      <van-row class="function-row">
        <van-col span="6">
          <div class="function-item">
            <div class="icon-placeholder"></div>
            <div class="text">统计数据</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="function-item">
            <div class="icon-placeholder"></div>
            <div class="text">我的订单</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="function-item">
            <div class="icon-placeholder"></div>
            <div class="text">我的消息</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="function-item">
            <div class="icon-placeholder"></div>
            <div class="text">桌面组件</div>
          </div>
        </van-col>
      </van-row>
    </van-cell-group>

    <!-- 第三部分：活动中心，邀请好友，帮助中心，设置 -->
    <van-cell-group class="user-info-section">
      <van-cell title="活动中心" is-link />
      <van-cell title="邀请好友" is-link />
      <van-cell title="帮助中心" is-link />
      <van-cell title="设置" is-link />
    </van-cell-group>
  </div>

  <footer-layout />
</template>

<script setup>
import FooterLayout from '../layout/FooterLayout.vue';
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()

// 设置用户头像的路径、用户名和背景图片的路径
const avatarPath = '/src/assets/avatar.png';
const username = userStore.username || '未登录'
const headerBgPath = '/src/assets/background1.jpg';

// 未登录时跳转到登录页面
function toLogin() {
  if (!userStore.username) {
    router.push({
      path: '/login'
    }
    )
  }
}

</script>

<style scoped>
.user-info {
  background-color: #f7f8fa;
  padding: 16px;
}

.user-info-section {
  margin-bottom: 10px;
  background-color: #fff;
}

.user-header {
  background-size: cover;
  background-position: center;
  padding: 60px 20px;
  /* 增加高度 */
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: #fff;
  /* 确保文字在背景图片上可见 */
}

.user-avatar {
  position: relative;
  left: -5px;
  top: -50px;
  /* 上移 */
  display: flex;
  align-items: center;
}

.user-avatar img {
  border-radius: 50%;
  width: 60px;
  /* 增加尺寸 */
  height: 60px;
  margin-right: 10px;
}

.user-avatar .username {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  /* 增加间距 */
}

.customer-service {
  position: relative;
  top: -50px;
  right: -5px;
  background-color: #fff;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
}

.function-row {
  margin: 0 -4px;
  /* 调整行的外边距以控制间距 */
}

.function-item {
  text-align: center;
  padding: 16px 4px;
  /* 增加高度 */
  background-color: #fafafa;
  border-radius: 8px;
  margin: 4px;
  /* 创建项之间的间距 */
}

.icon-placeholder {
  height: 40px;
  background-color: #e8e8e8;
  margin-bottom: 8px;
  border-radius: 50%;
  /* 可选：使占位符为圆形 */
}

.text {
  font-size: 14px;
}
</style>
