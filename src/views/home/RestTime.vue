<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回
const onClickBack = () => history.back()

const text = ref(['纯音乐', '经典', '治愈', 'DJ', '钢琴演奏', '国风'])

// 详情
const detail = (item) => {
  router.push({ path: '/music', query: { category: item } })
}
</script>

<template>
  <!-- 头部导航栏 -->
  <van-nav-bar title="听歌" left-arrow @click-left="onClickBack" />

  <!-- music首页 -->
  <div class="type">
    <div
      class="type-item"
      v-for="item in text"
      :key="item"
      @click="detail(item)"
    >
      <span class="content">{{ item }}</span>
      <van-icon name="play-circle-o" />
    </div>
  </div>
</template>

<style scoped>
.type {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .type-item {
    position: relative;
    width: calc(40% - 10px); /* 10px 是上面的gap值的一半 */
    height: 100px;
    background-color: pink;
    border-radius: 10px;
    font-size: 14px;
    margin: 10px 20px 20px;
  }

  .content {
    display: block;
    margin: 5px 0 0 10px;
    font-size: 18px;
    color: #fff;
  }

  .van-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 25px;
    color: #fff;
  }
}
</style>
