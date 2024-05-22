<script setup>
import { ref } from 'vue'
import TopLayout from '../layout/TopLayout.vue'
import FooterLayout from '../layout/FooterLayout.vue'

const isLoading = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const list = ref([
  {
    id: 1,
    imgSrc: 'https://example.com/image.jpg',
    title: '好看新闻',
    desc: '云南弥勒：以赛为媒 生态文旅多元融合赋能乡村振兴'
  },
  {
    id: 2,
    imgSrc: 'https://example.com/image.jpg',
    title: '好看新闻',
    desc: '云南弥勒：以赛为媒 生态文旅多元融合赋能乡村振兴'
  },
  {
    id: 3,
    imgSrc: 'https://example.com/image.jpg',
    title: '好看新闻',
    desc: '云南弥勒：以赛为媒 生态文旅多元融合赋能乡村振兴'
  },
  {
    id: 4,
    imgSrc: 'https://example.com/image.jpg',
    title: '好看新闻',
    desc: '云南弥勒：以赛为媒 生态文旅多元融合赋能乡村振兴'
  },
  {
    id: 5,
    imgSrc: 'https://example.com/image.jpg',
    title: '好看新闻',
    desc: '云南弥勒：以赛为媒 生态文旅多元融合赋能乡村振兴'
  },
  {
    id: 6,
    imgSrc: 'https://example.com/image.jpg',
    title: '好看新闻',
    desc: '云南弥勒：以赛为媒 生态文旅多元融合赋能乡村振兴'
  }
])
</script>

<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <TopLayout />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <!-- 宫格 -->
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>

    <!-- 列表 -->
    <div class="lists">
      <div class="list" v-for="item in list" :key="item.id">
        <van-row class="header" justify="center">
          <van-col span="17">
            <div class="title">{{ item.title }}</div>
          </van-col>
          <van-col span="6" class="more">
            <div>更多 ></div>
          </van-col>
        </van-row>
        <van-row class="content" justify="center">
          <van-col span="17">
            <div class="description">
              {{ item.desc }}
            </div>
          </van-col>
          <van-col span="6">
            <van-image
              width="100%"
              height="auto"
              :src="item.imgSrc"
              fit="cover"
            />
          </van-col>
        </van-row>
      </div>
      <div class="footer-word">没有更多内容了~</div>
    </div>
  </van-pull-refresh>
  <FooterLayout />
</template>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.lists {
  margin-bottom: 60px;
  .list {
    margin-top: 25px;

    .title {
      font-weight: bold;
      font-size: 16px;
    }

    .more {
      text-align: right;
    }

    .more div {
      font-size: 14px;
      color: #999;
    }

    .content {
      margin-top: 10px;
    }

    .description {
      font-size: 14px;
      line-height: 1.5;
    }
  }
  .footer-word {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
