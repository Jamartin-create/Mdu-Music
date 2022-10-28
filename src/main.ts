import { createApp } from 'vue'
import './style.css'
import './assets/css/global.css'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPresistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import "nprogress/nprogress.css";

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPresistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')
