import { createApp } from 'vue'
import './style.css'
import './assets/css/global.css'
import router from './router'
import pinia from './store'
import App from './App.vue'
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import "nprogress/nprogress.css";
// import './registerServiceWorker';

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')