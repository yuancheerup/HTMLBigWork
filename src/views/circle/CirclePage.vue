<template>
    <van-floating-bubble axis="xy" icon="chat" magnetic="x" :offset="{ x: 340, y: 550 }" @click="toTopic()"/>

  <FooterLayout/>
</template>

<script setup>
import FooterLayout from '../layout/FooterLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

function toTopic() {
  router.push({
    path: '/topic'
  })
}

</script>

<style scoped></style>
