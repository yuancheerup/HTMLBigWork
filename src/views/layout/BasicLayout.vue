<script setup>
import { ref } from 'vue'
const active = ref('home')
const value = ref('')
</script>

<template>
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

  <van-tabbar v-model="active">
    <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="search" icon="apps-o">应用</van-tabbar-item>
    <van-tabbar-item name="friends" icon="browsing-history-o"
      >圈子</van-tabbar-item
    >
    <van-tabbar-item name="setting" icon="contact-o">我的</van-tabbar-item>
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
