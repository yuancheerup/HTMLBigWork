<template>
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
import FooterLayout from '../layout/FooterLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const width = window.innerWidth * 0.85
const height = window.innerHeight * 0.8
const offset = ref({ x: width, y: height })

function toTopic() {
  router.push({
    path: '/topic'
  })
}
</script>

<style scoped></style>
