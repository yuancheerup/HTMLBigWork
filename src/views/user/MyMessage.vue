<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const onClickLeft = () => history.back()

const list = ref([
  {
    title: '端午安康',
    icon: 'point-gift',
    date: '06/10',
    img: '../../src/assets/img/mymessage-1.jpg',
    color: '#ffa852'
  },
  {
    title: '新用户优惠',
    icon: 'point-gift',
    date: '05/30',
    img: '../../src/assets/img/mymessage-2.jpg',
    color: '#ffa852'
  },
  {
    title: '百宝箱团队',
    icon: 'bell',
    date: '05-20',
    img: '../../src/assets/img/mymessage-3.jpg',
    color: '#7e7ce9'
  }
])
</script>

<template>
  <div class="box">
    <van-nav-bar
      title="我的消息"
      left-arrow
      @click-left="onClickLeft"
      :border="false"
    />

    <van-cell-group class="message-info" v-for="item in list" :key="item.title">
      <div class="title">
        <div class="left">
          <van-icon :name="item.icon" :color="item.color" />
          <span>{{ item.title }}</span>
        </div>
        <div class="right">{{ item.date }}</div>
      </div>
      <img :src="item.img" alt="" />
    </van-cell-group>
  </div>
</template>

<style scoped>
.box {
  height: 100vh;
  background-color: #fafafa;
  .van-nav-bar {
    background-color: #fafafa;
    --van-nav-bar-icon-color: #000;
  }

  .message-info {
    margin: 10px;
    border-radius: 10px;
    border: 1px solid #f7f7f7;
    box-shadow: 0 0 8px #f7f7f7;

    .title {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 14px;
      color: #333;
      .left {
        display: flex;
        align-items: center;
        .van-icon {
          margin-right: 10px;
          font-size: 18px;
        }
      }
      .right {
        color: #999;
      }
    }

    img {
      width: 94%;
      height: 100%;
      margin-left: 3%;
    }
  }
}
</style>
