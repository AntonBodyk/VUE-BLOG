<template>
    <!-- <form class="add-new-post" @submit.prevent="addPost">
        <h3>Создать пост</h3>
        <input v-model="post.title" type="text" class="input" placeholder="Название" >
        <input v-model="post.body" type="text" class="input" placeholder="Описание" >
        <input v-model="post.category" type="text" class="input" placeholder="Категория">
        <button class="btn" type="submit" style="background: darkcyan; color: white; margin: 30px 0 0 30%; width: 200px; height: 50px;">Добавить пост</button>
    </form> -->
    <div>
        <h1 class="sign">Добавить пост</h1>
        <a-form
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            style="width: 600px; margin-left: 40px; "
            @submit.prevent="addPost"
            >
            <a-form-item
                label=""
                name="title"
                :rules="[{ required: true, message: 'Пожалуйста введите название поста!' }]"
                >
                <a-input v-model:value="this.post.title" placeholder="Название поста" style="height: 50px;"/>
            </a-form-item>

            <a-form-item
                label=""
                name="body"
                :rules="[{ required: true, message: 'Пожалуйста введите текст поста!' }]"
                >
                <a-input v-model:value="this.post.body" placeholder="Текст поста" style="height: 50px;"/>
            </a-form-item>

            <a-form-item>
                <a-auto-complete
                    v-model:value="post.category"
                    :options="this.autocompleteOptions"
                    :filter-method="handleFilter"
                    @search="handleSearch"
                    :placeholder="'Категория поста'"
                >
                
            </a-auto-complete>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" style="margin-left: -70px; width: 150px; height: 50px;">Добавить</a-button>
            </a-form-item>
        </a-form>
        
    </div>
</template>

<script>

export default{
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
        
    }
}
</script>

<style scoped>

h1{
    font-size: 40px;
    color:darkslategray;
    margin-left: 23%;
}
.add-new-post{
    width: 500px;
    margin-top: 20px;
}
.input {
    /* width: 100%; */
    padding: 16px 16px 16px 60px;
    margin: 20px 0 0 15%;
    font-size: 24px;
    line-height: 1.4em;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border: 1px solid gray;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    outline: none;
}
.input::placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
}
.btn{
    background: darkcyan; 
    color: white; 
    margin: 30px 0 0 30%; 
    width: 200px; 
    height: 50px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}
</style>