<template>
  <div class="post-page">
    <van-tabs v-model:active="activeTab">
      <van-tab title="关注" name="follow" />
      <van-tab title="推荐" name="recommend" />
    </van-tabs>
    <div v-if="activeTab === 'follow'" class="post-list">
      <PostItem
        v-for="(post, index) in followPosts"
        :key="index"
        :post="post"
        @share="handleShare"
        @comment="goToComments(post)"
      />
    </div>
    <div v-else class="post-list">
      <PostItem
        v-for="(post, index) in recommendPosts"
        :key="index"
        :post="post"
        @share="handleShare"
        @comment="goToComments(post)"
      />
    </div>
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
  <van-floating-bubble
    axis="xy"
    icon="chat"
    magnetic="x"
    :offset="offset"
    @click="toTopic"
  />
  <FooterLayout />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts.js'
import PostItem from './PostItem.vue'
import 'vant/lib/tabs/style'
import 'vant/lib/tab/style'
import 'vant/lib/icon/style'
import 'vant/lib/share-sheet/style'
import FooterLayout from '../layout/FooterLayout.vue'

const router = useRouter()
const width = window.innerWidth * 0.85
const height = window.innerHeight * 0.8
const offset = ref({ x: width, y: height })
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

function toTopic() {
  router.push({
    path: '/topic'
  })
}

const activeTab = ref('follow')
const postsStore = usePostsStore()
const followPosts = computed(() => postsStore.followPosts)
const recommendPosts = computed(() => postsStore.recommendPosts)

const handleShare = () => {
  showShare.value = true
}

const goToComments = (post) => {
  router.push({
    path: `/comments/${post.id}`,
    query: { post: JSON.stringify(post) }
  })
}

onMounted(() => {
  postsStore.fetchFollowPosts()
  postsStore.fetchRecommendPosts()
})
</script>

<style scoped>
.post-page {
  padding: 10px;
  padding-bottom: 70px;
}

.van-tab {
  font-size: 16px;
}

.van-tabs__line {
  background-color: #409eff;
}
</style>
