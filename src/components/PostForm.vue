<template>
    <div>
        <h1 class="sign">Добавить пост</h1>
        <a-form
            name="basic"
            :model="post"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            style="width: 600px; margin-left: 40px; "
            @submit.prevent="addPost"
            >
            <a-form-item
                name="title"
                :rules="[{ required: true, message: 'Пожалуйста введите название поста!' }, {validator: validateTitle}]"
                >
                <a-input v-model:value="this.post.title" placeholder="Название поста" style="height: 50px; margin-bottom: 5px;"/>
            </a-form-item>

            <a-form-item name="category" :rules="[{ required: true, message: 'Пожалуйста введите название категории!' }, {validator: validateCategory}]">
                <a-auto-complete
                    style="padding-top: 20px;"
                    v-model:value="this.post.category"
                    :options="this.autocompleteOptions"
                    :filter-method="handleFilter"
                    @search="handleSearch"
                    
                >
                <template #default>
                    <a-input
                        class="custom-input"
                        :placeholder="'Категория поста'"
                    />
                </template>
            </a-auto-complete>
            </a-form-item>

            <a-form-item name="body" :rules="[{ required: true, message: 'Пожалуйста, введите текст!' }, {validator: validateBody}]">
                    <quill-editor v-model:value="this.post.body"></quill-editor>
            </a-form-item>
            

            

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" style="margin-left: -70px; width: 150px; height: 50px;">Добавить</a-button>
            </a-form-item>
        </a-form>
        
    </div>
</template>

<script>
import QuillEditor from './QuillEditor.vue';
// import { QuillEditor } from '@vueup/vue-quill';

export default{
    components:{
        QuillEditor
    },
    props:{
        posts:{
            type: Array,
        },
        
    },
    data(){
        return{
            post:{
                title: '',
                body: '',
                category: ''
            },
            autocompleteOptions: [],
            errors: []
        }
    },
    methods:{
        addPost(){
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: '',
                category: ''
            }
        },
        handleSearch() {

        const searchQuery = this.post.category;
        // Filter data based on the user's query
        const filteredPosts = this.posts.filter(post => post.category.includes(searchQuery));
        
        console.log(searchQuery);
        // Map the filtered data to the format expected by Ant Design's AutoComplete
        this.autocompleteOptions = filteredPosts.map(item => ({value: item.category, id: item.id}));
        console.log(this.autocompleteOptions); // Log the filtered options
        },
        handleFilter(input, option) {
        // Customize filtering logic if needed
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        checkForm: function (e){
            this.errors = [];
            if(this.post.title == /[A-Z]/.test(this.post.title)){
                return true;
            }else{
                this.errors.push('Укажите название с большой буквы');
            }

            e.preventDefault();


        },
        // onEditorChange ({ quill, html, text }) {
        //     console.log('editor change!', quill, html, text)
        //     this.$emit('change', html)
        // }
        validateTitle(rule, value) {
            return new Promise((resolve, reject) => {
                const namePattern = /^[А-ЯA-Z][а-яА-ЯA-Za-z]*$/;

                if (namePattern.test(value)) {
                    resolve(); 
                } else {
                    reject('Название должно начинаться с большой буквы!');
                }
            });
        },
        validateCategory(rule, value) {
            return new Promise((resolve, reject) => {
                const namePattern = /^[А-ЯA-Z][а-яА-ЯA-Za-z\s]*$/;
                const containsNumber = /\d/.test(value);

                if (!containsNumber && namePattern.test(value)) {
                    resolve(); 
                } else {
                    reject('Название категории должно начинаться с большой буквы и не содержать чисел!');
                }
            });
        },
        validateBody(rule, value) {
            return new Promise((resolve, reject) => {
                const namePattern = /^[А-ЯA-Z][а-яА-ЯA-Za-z]*$/;

                if (namePattern.test(value)) {
                    resolve(); 
                } else {
                    reject('Текст поста должен начинаться с большой буквы!');
                }
            });
        },
    }
}
</script>

<style scoped>

h1{
    font-size: 40px;
    color:darkslategray;
    margin-left: 23%;
}
.custom-input{
    height: 50px;
    margin-top: -25px;
}
.custom-input::placeholder{
    padding-top: 10px;
}
</style>