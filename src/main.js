import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/routes.js'
import withUUID from 'vue-uuid'

withUUID(createApp(App)).
use(router).
mount('#app')
