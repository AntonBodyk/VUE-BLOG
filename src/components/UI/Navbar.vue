<template>
    <div class="navbar">
        <div>
            <p>Vue-Blog</p>
        </div>
        <div class="navbar-btns">
            <!-- <button>Создать пост</button> -->
            <a-space>
                <a-button ghost>Default</a-button>
            </a-space>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>

.navbar{
    height: 50px;
    background-color: darkslategray;
    box-shadow: 2px 2px 4px grey;
    display: flex;
}
.navbar p{
    font-family: 'Pixelify Sans', sans-serif;
    font-size: 40px;
    color: aliceblue;
    padding-left: 100px;
}
.navbar-btns{
    margin: 9px 0 0 50%;
}
.navbar-btns button{
    margin-left: 15px;
}
</style>