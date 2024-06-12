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
    imgSrc1: '../../src/assets/img/科技-1.jpg',
    imgSrc2: '../../src/assets/img/科技-2.jpg',
    title: '科技新闻',
    desc1: '飞向月球',
    desc2: '智能时代'
  },
  {
    id: 2,
    imgSrc1: '../../src/assets/img/法律-1.jpg',
    imgSrc2: '../../src/assets/img/法律-2.jpg',
    title: '法律科普',
    desc1: '法治深壹度',
    desc2: '今日说法'
  },
  {
    id: 3,
    imgSrc1: '../../src/assets/img/生活-4.png',
    imgSrc2: '../../src/assets/img/生活-6.jpg',
    title: '生活科普',
    desc1: '防震减灾',
    desc2: '食品安全'
  },
  {
    id: 4,
    imgSrc1: '../../src/assets/img/应急-1.png',
    imgSrc2: '../../src/assets/img/应急-2.png',
    title: '应急科普',
    desc1: '被毒虫叮咬怎么办',
    desc2: '如何避险泥石流'
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
    <van-grid :border="false">
      <van-grid-item text="果蔬百科" to="/fruit">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-baike2"></use>
        </svg>
        <span>果蔬百科</span>
      </van-grid-item>
      <van-grid-item text="生活小妙招" to="/life">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dengpao3"></use>
        </svg>
        <span>生活小妙招</span>
      </van-grid-item>
      <van-grid-item text="四季养生" to="/healthy">
        <span
          class="icon iconfont icon-yangsheng"
          style="color: #f89898"
        ></span>
        <!-- <svg class="icon" aria-hidden="true" style="color: #fff">
          <use xlink:href="#icon-yangsheng" style="color: #fff"></use>
        </svg> -->
        <span>四季养生</span>
      </van-grid-item>
      <van-grid-item text="放空" to="/rest">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-erji1"></use>
        </svg>
        <span>放空</span>
      </van-grid-item>
    </van-grid>

    <!-- 列表 -->
    <div class="lists">
      <div class="list" v-for="item in list" :key="item.id">
        <van-row class="header" justify="center">
          <van-col span="16">
            <div class="title">
              {{ item.title }}
            </div>
          </van-col>
          <van-col span="6" class="more">
            <div>更多 ></div>
          </van-col>
        </van-row>
        <van-row class="content" justify="center">
          <van-col span="10" class="content-col">
            <van-image
              width="100%"
              height="7rem"
              :src="item.imgSrc1"
              fit="cover"
              position="center"
            />
            <div class="content-text">{{ item.desc1 }}</div>
          </van-col>
          <van-col span="10" class="content-col">
            <van-image
              width="100%"
              height="7rem"
              :src="item.imgSrc2"
              fit="cover"
            />
            <div class="content-text">{{ item.desc2 }}</div>
          </van-col>
        </van-row>
      </div>
      <div class="footer-word">没有更多内容了~</div>
    </div>
  </van-pull-refresh>
  <FooterLayout />
</template>

<style scoped>
/* .van-pull-refresh {
  background-color: #fafafa;
} */

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.van-grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  border: 1px solid #fafafa;
  border-bottom: 10px solid #fafafa;
  /* --van-grid-item-content-background: #fafafa; */

  .icon {
    font-size: 30px;
    margin-bottom: 5px;
  }
}

.lists {
  margin-bottom: 60px;
  .list {
    margin-top: 25px;

    .title {
      margin-left: 10px;
      padding-left: 10px;
      border-left: 5px solid #39a9ed;
      font-size: 20px;
      font-weight: bold;
      color: #337ecc;
      /* color: #000; */
    }

    .more {
      text-align: right;
    }

    .more div {
      font-size: 14px;
      color: #337ecc;
    }

    .content {
      margin-top: 10px;

      .content-col {
        margin: 10px 12px;
      }
      .content-text {
        text-align: center;
      }
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

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
