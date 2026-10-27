<script setup lang="ts">
import { debounce } from 'lodash'
import { reactive, ref } from 'vue'
import StarsAndWarp from '@/views/HomeView/StarsAndWarp.vue'

const formData = reactive({
  date: '',
  baseYear: 2323,
})
const starDate = ref('')
const warp = ref(false)

const calculateStarDate = debounce(() => {
  if (!formData.date) return

  formData.baseYear = Math.max(1970, Math.min(2323, formData.baseYear))

  const date = new Date(formData.date)
  const year = date.getFullYear()

  const start = new Date(year, 0, 0)
  const diff = date - start
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  const denominator = isLeap ? 366 : 365

  const sd = (year - formData.baseYear) * 1000 + (dayOfYear / denominator) * 1000
  starDate.value = sd.toFixed(2)
}, 250)
</script>

<template>
  <div class="star-date-app">
    <div class="background position-fixed top-0 start-0 w-100 h-100 overflow-hidden z-n1">
      <StarsAndWarp :warp="warp"/>
    </div>
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <h1 class="title">
        🪐 Star Trek's Stardate calculator
      </h1>

      <div class="calculator-container">
        <div class="calculator">
          <label for="date">
            Please, insert the current base year <br>
            <small>(min. 1970, max. 2323. Default: 2323)</small>
          </label>
          <input type="number"
                 min="1970"
                 max="2323"
                 v-model="formData.baseYear"
                 @input="calculateStarDate"/>

          <label for="date"
                 class="mt-3">and the current date</label>
          <input type="date"
                 v-model="formData.date"
                 @input="calculateStarDate"/>

          <div class="result">
            <p>📅 Stardate: <strong v-if="starDate">{{ starDate }}</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
::-webkit-calendar-picker-indicator {
  cursor: pointer;
  border-radius: 4px;
  margin-right: 2px;
  opacity: 1;
  filter: invert(1);
}

.star-date-app {
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-shadow: 0 0 5px #00ffff;
  }

  .calculator-container {
    background: radial-gradient(circle at top, #0a0a23, #000000);

    .calculator {
      width: fit-content;
      background-color: rgba(255, 255, 255, 0.05);
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);

      label {
        display: block;
        margin-bottom: 0.5rem;
      }

      input[type="date"],
      input[type="number"] {
        width: 188px;
        background: #111;
        color: #0ff;
        border: 1px solid #0ff;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 1rem;
      }

      .result {
        margin-top: 1.5rem;
        font-size: 1.3rem;
        color: #0ff;
      }
    }
  }
}
</style>
