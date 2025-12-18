// import './assets/main.css'
import '@/styles/reset.scss'

import { createApp } from 'vue'
import JsonViewer from 'vue-json-viewer';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(JsonViewer)
app.use(router)

app.mount('#app')
