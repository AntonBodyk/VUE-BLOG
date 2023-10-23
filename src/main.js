import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPinia } from 'pinia';
import components from '@/components/UI'
const pinia = createPinia();



const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component);
});

app
    .use(router)
    .use(Antd)
    .use(pinia)
    .mount('#app');



