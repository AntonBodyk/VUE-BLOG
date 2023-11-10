<template>
    <div class="modal" v-if="show">
      <div class="modal-dialog">
        <div class="modal-header">
          <slot name="header">
            <h3>Заголовок модального окна</h3>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <p>Содержимое модального окна</p>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button @click="closeModal">Закрыть</button>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {ref} from 'vue';
  export default {
    name: "Modal",
    props: {
        show: Boolean,
    },
    setup(props){
      
      const closeModal = () => {
        this.$emit("close");
      };

      const show = ref(props.show);

      return{
        closeModal,
        show
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-dialog {
    background-color: #fff;
    width: 80%;
    max-width: 500px;
    padding: 20px;
    border-radius: 5px;
  }
  
  .modal-header {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .modal-footer {
    text-align: center;
    margin-top: 10px;
  }
  </style>