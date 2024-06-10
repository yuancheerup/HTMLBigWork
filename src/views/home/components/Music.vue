<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import listenBg from '@/assets/img/listen-bg.png' // 导入图片

const route = useRoute()

// 返回
const onClickBack = () => history.back()

// 歌曲信息
const songInfo = ref([
  {
    name: '若是月亮还没来',
    author: '海洋悅动',
    img: '../../../../src/assets/img/若是月亮还没来.jpg',
    url: '../../../../src/assets/audio/若是月亮没来 (纯音乐).mp3'
  },
  {
    name: '盛夏与蝉鸣',
    author: 'hea2t',
    img: '../../../../src/assets/img/hea2t - 盛夏与蝉鸣.jpg',
    url: '../../../../src/assets/audio/hea2t - 盛夏与蝉鸣.mp3'
  },
  {
    name: 'Time To Love',
    author: 'OCTOBER',
    img: '../../../../src/assets/img/OCTOBER - Time To Love (相爱时间).jpg',
    url: '../../../../src/assets/audio/OCTOBER - Time To Love (相爱时间).mp3'
  },
  {
    name: 'Bloom of Youth',
    author: '清水準',
    img: '../../../../src/assets/img/清水準一 - Bloom of Youth (风华正茂).jpg',
    url: '../../../../src/assets/audio/清水準一 - Bloom of Youth (风华正茂).mp3'
  },
  {
    name: '思绪放松',
    author: '张颜烁',
    img: '../../../../src/assets/img/张颜烁 - 思绪放松.jpg',
    url: '../../../../src/assets/audio/张颜烁 - 思绪放松.mp3'
  },
  {
    name: '踏进云端',
    author: '张颜烁',
    img: '../../../../src/assets/img/张颜烁 - 踏进云端.jpg',
    url: '../../../../src/assets/audio/张颜烁 - 踏进云端.mp3'
  },
  {
    name: '春游 (吉它曲)',
    author: '野浪吉他社',
    img: '../../../../src/assets/img/野浪吉他社 - 春游 (吉它曲).jpg',
    url: '../../../../src/assets/audio/野浪吉他社 - 春游 (吉它曲).mp3'
  },
  {
    name: '被治愈的时光 (吉它曲)',
    author: '野浪吉他社',
    img: '../../../../src/assets/img/野浪吉他社 - 被治愈的时光 (吉它曲).jpg',
    url: '../../../../src/assets/audio/野浪吉他社 - 被治愈的时光 (吉它曲).mp3'
  }
])

// 听歌
const listenFlag = ref(false)
const currentSong = ref(null)
const listen = (item) => {
  currentSong.value = item
  listenFlag.value = !listenFlag.value
  console.log(currentSong.value)
}

// 听歌返回
const onClickBackListen = () => {
  listenFlag.value = !listenFlag.value
}
</script>

<template>
  <div class="songs-list" v-if="!listenFlag">
    <!-- 头部导航栏 -->
    <van-nav-bar
      :title="route.query.category"
      left-arrow
      @click-left="onClickBack"
    />

    <!-- music详情页 -->
    <div class="type-detail">
      <div class="songs">
        <div
          class="song-item"
          v-for="item in songInfo"
          :key="item.name"
          @click="listen(item)"
        >
          <div class="song-img">
            <img :src="item.img" alt="" />
          </div>
          <div class="song-info">
            <div class="song-name">{{ item.name }}</div>
            <div class="song-author">{{ item.author }}</div>
          </div>
          <div class="song-play">
            <van-icon name="play-circle-o" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- music播放页 -->
  <div class="listen" v-else :style="{ backgroundImage: `url(${listenBg})` }">
    <!-- 头部 -->

    <div class="left-btn">
      <van-icon name="arrow-left" @click="onClickBackListen" />
    </div>

    <!-- 音频播放 -->
    <div class="audio-play">
      <audio controls :src="currentSong.url" autoplay></audio>
    </div>
  </div>
</template>

<style scoped>
.type-detail {
  height: 100%;
  background-color: #fff;

  .songs {
    .song-item {
      display: flex;
      padding: 10px;
      margin: 10px 0;
    }

    .song-img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 10px;
    }

    .song-img img {
      width: 100%;
      height: 100%;
    }

    .song-info {
      flex: 1;
    }

    .song-name {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .song-author {
      font-size: 14px;
      color: #999;
    }

    .song-play {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      background-color: #fff;
      color: #999;
      font-size: 20px;
      margin-left: 10px;
    }
  }
}

.listen {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .left-btn {
    padding: 15px;
    color: #000;
    font-size: 30px;
  }

  .audio-play {
    display: flex;
    justify-content: center;
    padding: 25px;
    background: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  }
}
</style>
