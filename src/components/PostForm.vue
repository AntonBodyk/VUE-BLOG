<template>
    <form action="#" class="add-new-post">
        <h3>Создать пост</h3>
        <input v-model="title" type="text" class="input" placeholder="Название">
        <input v-model="body" type="text" class="input" placeholder="Описание">
        <button class="btn">Добавить пост</button>
    </form>
</template>

<script>
export default{
    data(){
        return{
            title: '',
            body: ''
        }
        
    }
}
</script>

<style scoped>

h3{
    font-size: 40px;
    color:darkslategray
}
.add-new-post{
    width: 500px;
    margin: 20px 0 0 100px;
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