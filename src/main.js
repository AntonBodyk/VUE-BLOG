import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

createApp(App)
    .use(router)
    .use(Antd)
    .mount('#app');