<script setup>
import { ref } from 'vue'
const value = ref('')
</script>

<template>
  <!-- 头部 -->
  <van-row class="row">
    <van-col span="3">
      <span class="iconfont icon-a-136-gongjuxiangshuangse"></span>
    </van-col>
    <van-col span="18">
      <van-search
        v-model="value"
        shape="round"
        background="linear-gradient(#409eff, #79bbff)"
        placeholder="请输入搜索关键词"
        class="search"
      >
        <template #right-icon>
          <van-icon name="scan" />
        </template>
      </van-search>
    </van-col>
    <van-col span="3" class="col-right"><van-icon name="chat-o" /></van-col>
  </van-row>
</template>

<style scoped>
.row {
  height: 54px;
  background: linear-gradient(#409eff, #79bbff);

  .iconfont {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 54px;
    font-size: 30px;
    color: #fff;
  }

  .search {
    height: 40px;
    margin-top: 7px;
  }

  .col-right {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 54px;
    font-size: 28px;
    color: #fff;
  }
}
</style>
