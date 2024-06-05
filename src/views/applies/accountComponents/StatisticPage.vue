<script setup>
import { ref } from 'vue'
import StatisticMonth from '@/views/applies/accountComponents/StatisticMonth.vue'
import StatisticYear from '@/views/applies/accountComponents/StatisticYear.vue'

// 返回
const onClickBack = () => {
  history.back()
}
const showShare = ref(false)
const options = [
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: '微博', icon: 'weibo' },
    { name: 'QQ', icon: 'qq' }
  ],
  [
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
    { name: '小程序码', icon: 'weapp-qrcode' }
  ]
]

//标签页
const activeName = ref('month')
</script>

<template>
  <div class="total-statistic">
    <!-- 头部 -->
    <div class="header">
      <div class="header-top">
        <van-icon name="arrow-left" @click="onClickBack" />
        <span>统计</span>
        <van-icon name="share-o" @click="showShare = true" />
        <van-share-sheet
          v-model:show="showShare"
          title="立即分享给好友"
          :options="options"
        />
      </div>

      <!-- tab标签 -->
      <van-tabs
        v-model:active="activeName"
        title-active-color="#3eb575"
        color="#3eb575"
        background="#f7f7f7"
      >
        <van-tab title="" name=""></van-tab>
        <van-tab title="月" name="month">
          <StatisticMonth></StatisticMonth>
        </van-tab>
        <van-tab title="年" name="year">
          <StatisticYear></StatisticYear>
        </van-tab>
        <!-- <van-tab title="总" name="sum">
        </van-tab> -->
        <van-tab title="" name=""></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped>
.total-statistic {
  width: 100%;
  min-height: 100%;
  background-color: #f7f7f7;
  padding-bottom: 5px;

  .header {
    .header-top {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px 0;
      font-size: 16px;
    }
    /* 修改van-tab的样式 */
  }
}
</style>
