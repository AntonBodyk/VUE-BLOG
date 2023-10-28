import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { useCommentStore } from '@/store/commentStore';
import { createPinia } from 'pinia';
import components from '@/components/UI';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ColorTextDirective from './components/directives/ColorTextDirective';
import GlobalMixin from './components/mixins/GlobalMixin';



const pinia = createPinia();
const app = createApp(App)



components.forEach(component => {
    app.component(component.name, component);
});

app.directive('text-color', ColorTextDirective);
app.mixin(GlobalMixin);

app
    .use(router)
    .use(Antd)
    .use(pinia)
    .component('QuillEditor', QuillEditor)
    .mount('#app');



    const commentStore = useCommentStore();
    commentStore.loadCommentCountsFromLocalStorage();