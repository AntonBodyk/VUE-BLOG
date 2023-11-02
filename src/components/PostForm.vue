<template>
    <div>
        <h1 class="sign">Добавить пост</h1>
            <a-form
                name="basic"
                ref="form"
                :model="post"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                style="width: 600px; margin-left: 40px; "
                
                @submit.prevent="submitForm"
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
                    :options="filterAutocomplete()"
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

            <a-form-item name="body" :rules="[{ required: true, message: 'Пожалуйста, введите текст!' },{
                pattern: /[А-ЯA-Z][ \t]*[а-яА-ЯA-Za-z\s]*$/,
                message: 'Текст поста должен начинаться с большой буквы',
            }]">
                <quill-editor v-model:content="this.post.body" contentType="text" theme="snow" ref="quillEditor"></quill-editor>
            </a-form-item>
            

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" style="margin-left: -70px; width: 150px; height: 50px;">Добавить</a-button>
            </a-form-item>
        </a-form>
        </div>
    
</template>

<script>
import { ref } from 'vue';
const quillEditor = ref(null);
export default{
    props:{
        posts:{
            type: Array,
            required: true
        }
    },
    data(){
        return{
            post:{
                title: '',
                body: '',
                category: '',
            },
            autocompleteOptions: [],
        }
    },
    methods:{
        submitForm() {

            
            setTimeout(() => {
                this.$refs.form.validate().then(res => {
                    this.$emit('create', this.post);
                    
                    this.post = {
                        title: '',
                        body: '',
                        category: '',
                    };
                    this.clearQuillEditor();
                }).catch(error => {
                    console.log(error)
                
                })
            }, 0);
            
        },
        handleSearch() {
            const searchQuery = this.post.category;
            
            const filteredPosts = this.posts.filter(post => post.category && post.category.includes(searchQuery));
            
            this.autocompleteOptions = filteredPosts.map(item => ({value: item.category, id: item.id}));
        },
        handleFilter(input, option) {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        validateTitle(rule, value) {
            if(value){
                const namePattern = /[А-ЯA-Z][ \t]*[а-яА-ЯA-Za-z\s]*$/
                if (namePattern.test(value)) {
                    return Promise.resolve(); 
                } else {
                    return Promise.reject('Название должно начинаться с большой буквы!');
                }
            }else{
                    return Promise.resolve();
            }
        },
        filterAutocomplete(){
            const table = {};
            const res = this.autocompleteOptions.filter(({value}) =>(!table[value] && (table[value] = 1)));
            return res;
        },
        validateCategory(rule, value) {
            if(value){
                const categoryPattern = /^[А-ЯA-Z][ \t]*[а-яА-ЯA-Za-z\s-]*$/;
                const containsNumber = /\d/.test(value);

                if (!containsNumber && categoryPattern.test(value)) {
                    return Promise.resolve(); 
                } else {
                    return Promise.reject('Название категории должно начинаться с большой буквы и не содержать чисел!');
                }
            }else{
                    return Promise.resolve();
            }
        },
        clearQuillEditor() {
            this.$refs.quillEditor.setContents('');
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