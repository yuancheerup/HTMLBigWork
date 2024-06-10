<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回
const onClickBack = () => history.back()

const text = ref([
  {
    title: '纯音乐',
    icon: 'icon-chunyinle',
    gradient: 'linear-gradient(to right, #ff7e5f, #feb47b)'
  },
  {
    title: '治愈',
    icon: 'icon-zhiyu',
    gradient: 'linear-gradient(to right, #43cea2, #185a9d)'
  },
  {
    title: '经典',
    icon: 'icon-jingdian',
    gradient: 'linear-gradient(to right, #30cfd0, #330867)'
  },
  {
    title: 'DJ',
    icon: 'icon-DJ',
    gradient: 'linear-gradient(to right, #00c6ff, #0072ff)'
  },
  {
    title: '流行',
    icon: 'icon-karaoke',
    gradient: 'linear-gradient(to right, #f7971e, #ffd200)'
  },
  {
    title: '国风',
    icon: 'icon-guofengshanzi',
    gradient: 'linear-gradient(to right, #ff512f, #dd2476)'
  },
  {
    title: 'Hi-Res',
    icon: 'icon-erji',
    gradient: 'linear-gradient(to right, #0099ff, #43a047)'
  },
  {
    title: '欧美',
    icon: 'icon-a-1_oumei1',
    gradient: 'linear-gradient(to right, #ffa500, #ff4500)'
  },
  {
    title: '戏曲',
    icon: 'icon-xiqu',
    gradient: 'linear-gradient(to right, #993333, #e0b4b4)'
  },
  {
    title: '儿童',
    icon: 'icon-ertongpiao',
    gradient: 'linear-gradient(to right, #0088ff, #87ceeb)'
  }
])

// 详情
const detail = (item) => {
  router.push({
    path: '/music',
    query: { category: item.title, gradient: item.gradient }
  })
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
      :style="{ background: item.gradient }"
    >
      <span class="content">{{ item.title }}</span>
      <span class="iconfont" :class="item.icon"></span>
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

    .iconfont {
      position: absolute;
      top: 60%;
      left: 40%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: #fff;
    }
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
