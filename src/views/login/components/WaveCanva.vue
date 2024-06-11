<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  drawWave()
})

const drawWave = () => {
  const canvas = document.getElementById('waveCanvas')
  const ctx = canvas.getContext('2d')
  const width = (canvas.width = canvas.offsetWidth)
  const height = (canvas.height = 180)

  ctx.clearRect(0, 0, width, height)

  // 旋转180°
  ctx.translate(width / 2, height / 2)
  ctx.rotate(Math.PI)
  ctx.translate(-width / 2, -height / 2)
  ctx.translate(width, 0)
  ctx.scale(-1, 1)

  // 绘制第一个波浪
  ctx.beginPath()
  ctx.moveTo(0, height * 0.4)
  ctx.bezierCurveTo(
    width * 0.2,
    height * 0.6,
    width * 0.4,
    height * 0.2,
    width * 0.6,
    height * 0.4
  )
  ctx.bezierCurveTo(
    width * 0.8,
    height * 0.6,
    width,
    height * 0.5,
    width,
    height * 0.5
  )
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.closePath()
  ctx.fillStyle = 'rgba(0, 198, 255)'
  ctx.fill()

  // 绘制第二个波浪
  ctx.beginPath()
  ctx.moveTo(0, height * 0.4)
  ctx.bezierCurveTo(
    width * 0.2,
    height * 0.2,
    width * 0.4,
    height * 0.6,
    width * 0.6,
    height * 0.4
  )
  ctx.bezierCurveTo(
    width * 0.8,
    height * 0.2,
    width,
    height * 0.5,
    width,
    height * 0.5
  )
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.closePath()
  ctx.fillStyle = 'rgba(0, 198, 255, 0.2)'

  ctx.fill()

  // 绘制第三个波浪
  // ctx.beginPath()
  // ctx.moveTo(0, height * 0.2)
  // ctx.bezierCurveTo(
  //   width * 0.2,
  //   height * 0.4,
  //   width * 0.4,
  //   0,
  //   width * 0.6,
  //   height * 0.2
  // )
  // ctx.bezierCurveTo(
  //   width * 0.8,
  //   height * 0.4,
  //   width,
  //   height * 0.1,
  //   width,
  //   height * 0.3
  // )
  // ctx.lineTo(width, height)
  // ctx.lineTo(0, height)
  // ctx.closePath()
  // ctx.fillStyle = 'rgba(0, 198, 255, 0.2)'
  // ctx.fill()
}
</script>

<template>
  <div class="box">
    <div class="wave-container">
      <canvas id="waveCanvas" class="wave"></canvas>
    </div>
    <!-- <div class="back"><van-icon name="cross" /></div> -->
  </div>
</template>

<style scoped>
.box {
  position: relative;
  .wave-container {
    width: 100%;
    height: 180px;
    overflow: hidden;

    .wave {
      width: 100%;
      height: 100%;
    }
  }

  /* .back {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: #fff;
  } */
}
</style>
