<script setup>
import { ref } from 'vue'
const active = ref('home')
const value = ref('')
</script>

<template>
  <!-- 头部 -->
  <van-row class="row">
    <van-col span="4"></van-col>
    <van-col span="16">
      <van-search
        v-model="value"
        shape="round"
        background="#73cf11"
        placeholder="请输入搜索关键词"
        class="search"
      />
    </van-col>
    <van-col span="4"></van-col>
  </van-row>

  <div id="container">
    <slot></slot>
  </div>

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

<style scoped>
.row {
  height: 54px;
  background-color: #73cf11;
  .search {
    height: 40px;
    margin-top: 7px;
  }
}
</style>
