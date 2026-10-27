import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/assets/scss/styles.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(router)

app.mount('#app')
