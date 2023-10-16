<template>
    <div class="modal-create" v-if="show" @click.stop="hideModal">
        <div @click.stop class="modal-content">
            <div @click="hideModal" class="modal__close">&times;</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        show:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        hideModal(){
            this.$emit('update:show', false);
        }
    }
}
</script>

<style scoped>
.modal-create{
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
}

.modal-content {
        margin: auto;
        background: #fff;
        border-radius: 12px;
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
}

.modal__close{
    /* top:3px; */
    right:14px;
    margin-left: 95%;
    font-size:30px;
    color:#000;
    opacity:.5;
    font-weight:700;
    border:none;
    background-color:transparent;
    cursor:pointer;
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