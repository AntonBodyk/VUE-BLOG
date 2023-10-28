<template>
    <div class="child-component">
      <button @click="emitData">Отправить данные</button>
      <slot :data="childData"></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChildSlotComponent",
    data() {
      return {
        childData: "Данные из дочернего компонента",
      };
    },
    methods: {
      emitData() {
        this.$emit("data", this.childData);
      },
    },
  };
  </script>
  
  <style scoped>
  .child-component {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  </style>