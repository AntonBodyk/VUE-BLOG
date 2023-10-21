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
            <!-- <p v-if="errors.length">
                <b>Пожалуйста исправьте указанные ошибки:</b>
                <ul>
                    <li v-for="error in errors" :key="error.index">{{ error }}</li>
                </ul>
            </p> -->
            <a-form-item
                name="title"
                :rules="[{ required: true, message: 'Пожалуйста введите название поста!' }]"
                >
                <a-input v-model:value="post.title" placeholder="Название поста" style="height: 50px; margin-bottom: 5px;"/>
            </a-form-item>

            <a-form-item name="category">
                <a-auto-complete
                    style="padding-top: 20px;"
                    v-model:value="post.category"
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

            <a-form-item name="body">
                <quill-editor v-model:value="post.body" theme="snow" :content-type="html"></quill-editor>
            </a-form-item>
            

            

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" style="margin-left: -70px; width: 150px; height: 50px;">Добавить</a-button>
            </a-form-item>
        </a-form>
        
    </div>
</template>

<script>
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
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
        onEditorChange ({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.$emit('change', html)
        }
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