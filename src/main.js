import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import axios from 'axios'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
axios.defaults.baseURL='http://localhost:5000'

// 在请求头中添加 Authorization 头部
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const app=createApp(App)

app.config.globalProperties.$axios=axios
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)
app.use(router)
app.mount('#app')
