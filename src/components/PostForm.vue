<template>
    <div>
        <h1 class="sign">Добавить пост</h1>
        <a-form
            name="basic"
            ref="formRef"
            :model="post"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            style="width: 600px; margin-left: 40px; "
            @submit.prevent="submitForm"
        >
        <a-form-item
            name="title"
            :rules="[{ required: true, message: 'Пожалуйста введите название поста!' }, { validator: validateTitle }]"
            >
            <a-input v-model:value="post.title" placeholder="Название поста" style="height: 50px; margin-bottom: 5px;" />
        </a-form-item>
    
        <a-form-item name="category" :rules="[{ required: true, message: 'Пожалуйста введите название категории!' }, { validator: validateCategory }]">
            <a-auto-complete
                style="padding-top: 20px;"
                v-model:value="post.category"
                :options="filterAutocomplete()"
                :filter-method="handleFilter"
                @search="handleSearch"
            >
                <template #default>
                <a-input class="custom-input" :placeholder="'Категория поста'" />
                </template>
            </a-auto-complete>
        </a-form-item>
  
        <a-form-item name="body" :rules="[ { required: true, message: 'Пожалуйста, введите текст!' }, { validator: validateText } ]">
            <a-textarea v-model:value="post.body" :rows="4" :placeholder="'Текст поста'" />
        </a-form-item>
  
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit" style="margin-left: -70px; width: 150px; height: 50px;" >Добавить</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
<script>
import { ref } from 'vue';
import { usePostsStore } from '@/store/postsStore';

export default {
    props: {
        addPost: Function
    },
    setup(props) {
        const post = ref({
            title: '',
            body: '',
            category: '',
        });
        const autocompleteOptions = ref([]);
        const formRef = ref(null);


        const submitForm = () => {
            
                setTimeout(() => {
                    const valid = formRef.value.validate();
                    
                    if (valid) {
                        props.addPost(post.value);

                        post.value = {
                            title: '',
                            body: '',
                            category: '',
                        };
                    } else {
                        console.log('Form validation failed');
                    }
                }, 0)

            
        };

        const handleSearch = () => {
            const postsStore = usePostsStore();
            const searchQuery = post.value.category;

            const filteredPosts = postsStore.posts.filter((post) => post.category && post.category.includes(searchQuery));

            autocompleteOptions.value = filteredPosts.map((item) => ({ value: item.category, id: item.id }));
        };

        const handleFilter = (input, option) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const validateTitle = (rule, value) => {
            if (value) {
                const namePattern = /[А-ЯA-Z][ \t]*[а-яА-ЯA-Za-z\s]*$/;
                if (namePattern.test(value)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Название должно начинаться с большой буквы!');
                }
            } else {
                return Promise.resolve();
            }
        };

        const filterAutocomplete = () => {
            const table = {};
            const res = autocompleteOptions.value.filter(({ value }) => !table[value] && (table[value] = 1));
            return res;
        };

        const validateCategory = (rule, value) => {
            if (value) {
                const categoryPattern = /^[А-ЯA-Z][ \t]*[а-яА-ЯA-Za-z\s-]*$/;
                const containsNumber = /\d/.test(value);

                if (!containsNumber && categoryPattern.test(value)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Название категории должно начинаться с большой буквы и не содержать чисел!');
                }
            } else {
                return Promise.resolve();
            }
        };

        const validateText = (rule, value) => {
            if (value) {
                const commentPattern = /[А-ЯA-Z][ \t]*[а-яА-ЯA-Za-z\s]*$/;
                if (commentPattern.test(value)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Текст должен начинаться с большой буквы!');
                }
            } else {
                return Promise.resolve();
            }
        };


        return {
            post,
            autocompleteOptions,
            handleSearch,
            handleFilter,
            validateTitle,
            filterAutocomplete,
            validateCategory,
            validateText,
            submitForm,
            formRef
        };
    },
};
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