import { createApp } from 'vue'
import '@toast-ui/editor/toastui-editor-viewer.css'
import '@toast-ui/editor/toastui-editor.css'
import './style.css'
import App from './App.vue'
import router from './routes/routes.js'
import withUUID from 'vue-uuid'

withUUID(createApp(App)).
use(router).
mount('#app')
