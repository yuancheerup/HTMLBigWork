<template>
  <van-nav-bar title="四季养生" left-text="返回" @click-left="$router.back()" />
  <van-swipe :autoplay="0" class="swipe">
    <van-swipe-item v-for="item in items" :key="item.id" class="swipe-item">
      <div class="content">
        <img :src="item.background" class="image" />
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="paragraph">{{ formatText(item.text) }}</div>
        </div>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    id: 1,
    background: 'src/assets/img/起居.jpg',
    title: '起居',
    text: '规律的作息是保障健康的又一重要因素。春季的三个月，阳气一天比一天增强，太阳一天比一天升起的早，大自然万物开始顺应自然规律复苏，是万象更新的季节。人也要顺应自然的规律，做到早睡早起，最好与太阳的起落协调，有益于人体的养护和健康。' +
      '春季的白天已经渐长，因此相对于冬天的晚睡晚起的起居，这时就要早睡早起，不要熬夜，这样就可以顺应阳气的升发，还能养护肝的阴血，进而维护人体的阴阳平衡，促进人体的健康。'
  },
  {
    id: 2,
    background: 'src/assets/img/体育锻炼.jpg',
    title: '体育锻炼',
    text: '春季的运动养生要注意循序渐进，使身体慢慢的适应运动的力度和强度，运动的力度和强度过大，不但有损人体的肌肉，韧带等功能，还会导致大量出汗，还会损伤人体的阳气和阴津，造成身体的损害。因此要适度运动并循序渐进，这样才能保障春季运动达到养生保健的作用。\n' +
      '\n' +
      '因此运动时要选择适宜的体育运动，如伸懒腰、散步、慢跑、太极拳等等，疏通调理人体的气血，顺应阳气的生发，提高人体的体质，维护人体的健康。'
  },
  {
    id: 3,
    background: 'src/assets/img/饮食.jpg',
    title: '饮食',
    text: '规律的饮食是保障健康的重要因素，合理规律的饮食有维护身体和增进健康的作用。春季里宜食大枣、蜂蜜、春芽、春笋、韭菜、樱桃、豆芽、蒜苗、橘子等等，适量的进食这些食物，有益春天里养肝健脾，补养人体，促进健康。\n' +
      '\n' +
      '春季饮食除了要规律外，还要依据个人的体质进行适当的选择，一般情况下，普通健康人群不要大量的进补。如果身体很虚弱，可以根据自身体质的实际需要，适量食用相应的补益食物进行补养，以达到养生保健的功效。'
  },
  {
    id: 4,
    background: 'src/assets/img/春季养肝.jpg',
    title: '养肝',
    text: '中医认为，春季五行属木，人体五脏之中相对应的为肝，肝脏是人体重要的器官之一，它具有调节人体气血，促进脾胃的运化，帮助脾胃消化饮食、吸收营养，并主疏泄，调畅人体情志，疏理人体的气机等作用。因此，春季里把我们的肝养护好，可以为一年的养生打下良好的基础，增益人体的健康。'
  },
  {
    id: 5,
    background: 'src/assets/img/精神情志.jpg',
    title: '精神情志',
    text: '精神神志的调养保健，使精神和形体保持协调，是人体健康的保障。中医认为，春气通于肝，肝气旺于春，人的情志要乐观愉快，以应阳气的生发和肝的舒畅调达。\n' +
      '\n' +
      '做到心态平和，日常生活中情绪稳定，尽力不生气，不急躁，不发怒，心情舒畅，保持一颗平常心，有利于顺应自然春阳的生发和肝的气机调达，这样有益于人远离抑郁等心理疾患，可以预防心理疾病的产生。'
  }
])

const formatText = (text) => {
  return text.split('\n').map(paragraph => '　　' + paragraph).join('\n')
}
</script>

<style scoped>
.swipe {
  height: 90%;
}

.swipe-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
}

.text {
  width: 95%;
  font-size: 14px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.paragraph {
  white-space: pre-wrap; /* 保证换行 */
  text-align: left; /* 左对齐文字 */
}
</style>
