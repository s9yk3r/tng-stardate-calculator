<script setup>
import {nextTick, onMounted, reactive, ref, toRefs, useTemplateRef, watch} from "vue";

const props = defineProps({
    starsCount: {
        type: Number,
        default: 1900
    },
    radius: {
        type: String,
        default: '0.'+Math.floor(Math.random() * 9) + 1
    },
    warp: {
        type: Boolean,
        default: false
    }
})

const { starsCount, radius, warp } = toRefs(props)

const centerX = ref(0)

const centerY = ref(0)

const canvasRef = useTemplateRef('canvasRef')

const focalLength = ref(0)

const stars = []

const animate = ref(true)

const context = ref(null)

function initializeStars() {
    stars.lenght = 0;

    for(let i = 0; i < starsCount.value; i++) {
        // the star position will be randomly defined based on the canvas size
        stars.push({
            x: Math.random() * canvasRef.value.width,
            y: Math.random() * canvasRef.value.height,
            z: Math.random() * canvasRef.value.width,
            o: '0.'+Math.floor(Math.random() * 99) + 1
        })
    }
}

function executeFrame(){
    if(animate.value) {
        requestAnimationFrame(executeFrame);
    }

    moveStars();
    drawStars();
}

function moveStars() {
    for(let i = 0; i < starsCount.value; i++){
        const star = stars[i];
        star.z--;

        if(star.z <= 0){
            star.z = canvasRef.value.width;
        }
    }
}

function drawStars(){
    // Resize to the screen
    if(
        canvasRef.value.width !== window.innerWidth ||
        canvasRef.value.width !== window.innerWidth
    ) {
        canvasRef.value.width = window.innerWidth;
        canvasRef.value.height = window.innerHeight;
        initializeStars();
    }

    if(!warp.value) {
        context.value.fillStyle = "rgba(0,10,20,1)";
        context.value.fillRect(
            0,
            0,
            canvasRef.value.width,
            canvasRef.value.height
        );
    }

    context.value.fillStyle = "rgba(209, 255, 255, " + radius.value + ")";

    for(let i = 0; i < starsCount.value; i++){
        const star = stars[i];

        let pixelX = (star.x - centerX.value) * (focalLength.value / star.z);
        pixelX += centerX.value;

        let pixelY = (star.y - centerY.value) * (focalLength.value / star.z);
        pixelY += centerY.value;

        const pixelRadius = (1 * (focalLength.value / star.z));

        context.value.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
        context.value.fillStyle = "rgba(209, 255, 255, " + star . o + ")";
        //context.value.fill();
    }
}

watch(warp, () => {
    context.value.clearRect(
        0,
        0,
        canvasRef.value.width,
        canvasRef.value.height
    );
    executeFrame();
})

onMounted(async () => {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    await nextTick()

    focalLength.value = (canvasRef.value.width * 2);
    centerX.value = (canvasRef.value.width / 2);
    centerY.value = (canvasRef.value.height / 2);
    await nextTick()

    context.value = canvasRef.value.getContext('2d');
    await nextTick()

    // generate random stars
    initializeStars();
    executeFrame();
})
</script>

<template>
    <div class="wrapper w-100 h-100">
        <canvas class="w-100 h-100"
                ref="canvasRef"></canvas>
    </div>
</template>

<style scoped lang="scss">
    @use '@/assets/scss/components/StarsAndWarp';
</style>
