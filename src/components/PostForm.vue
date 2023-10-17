<template>
    <form class="add-new-post" @submit.prevent="addPost">
        <h3>Создать пост</h3>
        <input v-model="post.title" type="text" class="input" placeholder="Название" >
        <input v-model="post.body" type="text" class="input" placeholder="Описание" >
        <input v-model="post.category" type="text" class="input" placeholder="Категория" >
        <button class="btn" type="submit">Добавить пост</button>
    </form>
</template>

<script>
export default{
    data(){
        return{
            post:{
                title: '',
                body: '',
                category: ''
            }
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
        }
    }
}
</script>

<style scoped>

h3{
    font-size: 40px;
    color:darkslategray;
    margin-left: 25%;
}
.add-new-post{
    width: 500px;
    margin-top: 20px;
}
.input {
    width: 100%;
    padding: 16px 16px 16px 60px;
    margin-top: 20px;
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
    margin-top: 20px;
    align-self: flex-start;
}
</style>