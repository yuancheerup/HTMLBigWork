<script setup>
import { ref } from 'vue'
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
