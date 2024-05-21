<script setup>
import { ref } from 'vue'
const active = ref('home')
</script>

<template>
  <!-- 底部导航 -->
  <van-tabbar v-model="active" route>
    <van-tabbar-item name="home" icon="home-o" replace to="/home"
      >首页</van-tabbar-item
    >
    <van-tabbar-item name="search" icon="apps-o" replace to="/apply"
      >应用</van-tabbar-item
    >
    <van-tabbar-item
      name="friends"
      icon="browsing-history-o"
      replace
      to="/circle"
      >圈子</van-tabbar-item
    >
    <van-tabbar-item name="setting" icon="contact-o" replace to="/user"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<style scoped></style>
