<template>
  <div class="post-page">
    <!-- 顶部选项卡 -->
    <van-tabs v-model:active="activeTab">
      <van-tab title="关注" name="follow" />
      <van-tab title="推荐" name="recommend" />
    </van-tabs>

    <!-- 帖子列表 -->
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

    <!-- 分享弹出框 -->
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
    @click="toTopic()"
  />
  <FooterLayout />
</template>

<script setup>
import PostItem from './PostItem.vue'
import 'vant/lib/tabs/style'
import 'vant/lib/tab/style'
import 'vant/lib/icon/style'
import 'vant/lib/share-sheet/style'
import FooterLayout from '../layout/FooterLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
const followPosts = ref([
  {
    id: 1,
    username: '用户A',
    avatar:
      'https://th.bing.com/th/id/OIP.v3ywLkq_yuiisLQpDZ9wagHaGk?w=215&h=191&c=7&r=0&o=5&pid=1.7',
    title: '切松花蛋有窍门',
    content:
      '用刀切松花蛋，蛋黄会粘在刀上，可用丝线将松花蛋割开，既均匀又不粘蛋黄。将刀在热水中烫一下再切，也能切的整齐漂亮。',
    images: [
      'https://img.zcool.cn/community/01ae745e12d62ba801216518c8d41c.jpg@3000w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01ae745e12d62ba801216518c8d41c.jpg@3000w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01ae745e12d62ba801216518c8d41c.jpg@3000w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01ae745e12d62ba801216518c8d41c.jpg@3000w_1l_2o_100sh.jpg',
      'https://img.zcool.cn/community/01ae745e12d62ba801216518c8d41c.jpg@3000w_1l_2o_100sh.jpg'
    ],
    commentBadge: 3,
    comments: [
      {
        username: '评论用户1',
        avatar:
          'https://tse4-mm.cn.bing.net/th/id/OIP-C.fJl5nsNzh1JYtIi3QLphtQHaHa?w=179&h=180&c=7&r=0&o=5&pid=1.7',
        content: '你干嘛哎呦。'
      },
      {
        username: '评论用户2',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户1的评论内容。'
      },
      {
        username: '评论用户3',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户2的评论内容。'
      }
    ]
  },
  {
    id: 2,
    username: '王二狗',
    avatar:
      'https://th.bing.com/th/id/OIP.jKaU6-sP2uwcEEDTGQQdGQHaHa?w=192&h=191&c=7&r=0&o=5&pid=1.7',
    title: '炒出透明虾仁',
    content:
      '将虾仁放入碗内，加一点精盐、食用碱粉，用手抓搓一会儿后用清水浸泡，然后再用清水洗净，这样能使炒出的虾仁透明如水晶，爽嫩可口。',
    images: ['https://tgi13.jia.com/114/821/14821779.jpg'],
    commentBadge: 5,
    comments: [
      {
        username: '评论用户1',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户1的评论内容。'
      },
      {
        username: '评论用户2',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户2的评论内容。'
      }
    ]
  },
  {
    id: 3,
    username: '李狗剩',
    avatar:
      'https://th.bing.com/th/id/OIP.awS6Ru8mLe1kwO2cj9tt2gHaHX?w=194&h=192&c=7&r=0&o=5&pid=1.7',
    title: '煮饺子不粘锅',
    content:
      '煮饺子时要添足水，待水开后加入少量的食盐，搅匀后再下饺子，这样能增加面筋的韧性，饺子不会粘皮粘锅，汤清饺香。',
    commentBadge: 0,
    comments: []
  },
  {
    id: 4,
    username: '铁批',
    avatar:
      'https://th.bing.com/th/id/OIP.NAhVu3Ll_gxcXDZtSoGLcgHaGo?w=218&h=196&c=7&r=0&o=5&pid=1.7',
    title: '关注帖子4',
    content: '这是关注帖子4的内容...',
    images: [
      'https://upload-bbs.miyoushe.com/upload/2023/06/23/160629650/369c25b08dcaebbf0902897e3ee022a0_6500134202499470358.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
      'https://media.9game.cn/gamebase/ieu-gdc-pre-process/images/20230213/0/16/f74e0156e06554c353d4b9ef40b408f6.jpg',
      'https://th.bing.com/th/id/OIP.n-EXdCH-NoQ_MS-N0LKdjQHaEo?rs=1&pid=ImgDetMain'
    ],
    commentBadge: 2,
    comments: [
      {
        username: '评论用户1',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户1的评论内容。'
      },
      {
        username: '评论用户2',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户2的评论内容。'
      }
    ]
  }
])
const recommendPosts = ref([
  {
    id: 5,
    username: '用户E',
    avatar: 'https://via.placeholder.com/40',
    title: '推荐帖子1',
    content: '这是推荐帖子1的内容...',
    images: ['https://via.placeholder.com/150'],
    commentBadge: 1,
    comments: [
      {
        username: '评论用户1',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户1的评论内容。'
      },
      {
        username: '评论用户2',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户2的评论内容。'
      }
    ]
  },
  {
    id: 6,
    username: '用户F',
    avatar: 'https://via.placeholder.com/40',
    title: '推荐帖子2',
    content: '这是推荐帖子2的内容...',
    images: ['https://via.placeholder.com/150'],
    commentBadge: 4,
    comments: [
      {
        username: '评论用户1',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户1的评论内容。'
      },
      {
        username: '评论用户2',
        avatar: 'https://via.placeholder.com/40',
        content: '这是评论用户2的评论内容。'
      }
    ]
  }
])

const handleShare = () => {
  showShare.value = true
}

const goToComments = (post) => {
  router.push({
    path: `/comments/${post.id}`,
    query: { post: JSON.stringify(post) }
  })
}
</script>

<style scoped>
.post-page {
  padding: 10px;
  padding-bottom: 70px; /* 确保 Footer 不会遮挡内容 */
}

.van-tab {
  font-size: 16px;
}

.van-tabs__line {
  background-color: #409eff;
}
</style>
