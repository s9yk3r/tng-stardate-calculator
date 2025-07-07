<script setup>
import {ref, reactive, watch} from 'vue'

const formData = reactive({
    date: '',
    baseYear: 2323
})
const starDate = ref('')

const calculateStarDate = () => {
    if (!formData.date) return

    if(formData.baseYear < 1970) {
        formData.baseYear = 1970
    } else if(formData.baseYear > 2323) {
        formData.baseYear = 2323
    }

    const date = new Date(formData.date)
    const year = date.getFullYear()

    // calculate the day of the year
    const start = new Date(year, 0, 0)
    const diff = date - start
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)

    // check if it's a leap year
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    const denominator = isLeap ? 366 : 365

    // calculate the star date
    const sd = (year - formData.baseYear) * 1000 + (dayOfYear / denominator) * 1000
    starDate.value = sd.toFixed(2)
}
</script>

<template>
    <div class="star-date-app">
        <div class="container d-flex flex-column justify-content-center align-items-center">
            <h1 class="title">
                🪐 Star Trek's Stardate calculator
            </h1>

            <div class="calculator">
                <label for="date">
                    Please, insert the current base year <br>
                    <small>(min. 1970, max. 2323. Default: 2323)</small>
                </label>
                <input type="number"
                       min="1970"
                       max="2323"
                       v-model="formData.baseYear"
                       @input="calculateStarDate" />

                <label for="date"
                       class="mt-3">and the current date</label>
                <input type="date"
                       v-model="formData.date"
                       @input="calculateStarDate" />

                <div class="result" v-if="starDate">
                    <p>📅 Stardate: <strong>{{ starDate }}</strong></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use '@/assets/scss/HomeView';
</style>
