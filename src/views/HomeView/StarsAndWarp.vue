<script setup lang="ts">
import { nextTick, onMounted, ref, toRefs, useTemplateRef, watch } from 'vue'

interface Props {
  starsCount: number
  radius: string
  warp: boolean
}

const props = withDefaults(defineProps<Props>(), {
  starsCount: 1900,
  radius: `0.${Math.floor(Math.random() * 9) + 1}`,
  warp: false,
})

const canvasRef = useTemplateRef('canvasRef')

const centerX = ref(0)
const centerY = ref(0)
const focalLength = ref(0)
const animate = ref(true)
const context = ref(null)

const stars = []

const initializeStars = () => {
  stars.length = 0

  for (let i = 0; i < props.starsCount; i++) {
    // the star position will be randomly defined based on the canvas size
    stars.push({
      x: Math.random() * canvasRef.value.width,
      y: Math.random() * canvasRef.value.height,
      z: Math.random() * canvasRef.value.width,
      o: `0.${Math.floor(Math.random() * 99) + 1}`,
    })
  }
}

const moveStars = () => {
  for (let i = 0; i < props.starsCount; i++) {
    const star = stars[i]
    star.z--

    if (star.z <= 0) {
      star.z = canvasRef.value?.width
    }
  }
}

const drawStars = () => {
  if (!canvasRef.value) return

  if (canvasRef.value?.width !== window.innerWidth || canvasRef.value?.width !== window.innerWidth) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight

    initializeStars()
  }

  if (!props.warp) {
    context.value.fillStyle = 'rgba(0,10,20,1)'
    context.value.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  }

  context.value.fillStyle = `rgba(209, 255, 255, ${props.radius})`

  for (let i = 0; i < props.starsCount; i++) {
    const star = stars[i]

    let pixelX = (star.x - centerX.value) * (focalLength.value / star.z)
    pixelX += centerX.value

    let pixelY = (star.y - centerY.value) * (focalLength.value / star.z)
    pixelY += centerY.value

    const pixelRadius = focalLength.value / star.z

    context.value.fillRect(pixelX, pixelY, pixelRadius, pixelRadius)
    context.value.fillStyle = `rgba(209, 255, 255, ${star.o})`
    //context.value.fill();
  }
}

const executeFrame = () => {
  if (animate.value) {
    requestAnimationFrame(executeFrame)
  }

  moveStars()
  drawStars()
}

watch(
  () => props.warp,
  () => {
    context.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    executeFrame()
  },
)

onMounted(async () => {
  if (!canvasRef.value) return

  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight

  await nextTick()

  focalLength.value = canvasRef.value.width * 2
  centerX.value = canvasRef.value.width / 2
  centerY.value = canvasRef.value.height / 2

  await nextTick()

  context.value = canvasRef.value.getContext('2d')

  await nextTick()

  initializeStars()
  executeFrame()
})
</script>

<template>
  <div class="wrapper w-100 h-100">
    <canvas class="w-100 h-100"
            ref="canvasRef"></canvas>
  </div>
</template>

<style scoped lang="scss">
@use 'helpers';

.wrapper {
  max-width: 100%;
  margin: 0;
  overflow: hidden;
  background: rgba(0,10,20,1) url(#{helpers.$imgs-path}warp.jpg) center no-repeat;
  background-size: cover;
  image-rendering: pixelated;
}
</style>
