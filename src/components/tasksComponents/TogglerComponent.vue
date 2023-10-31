<template>
    <div>
      <input v-model="userClass" type="text" placeholder="Enter class name" @input="applyClass()" />
      <div :class="userClass"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userClass: '',
      };
    },
    methods: {
      applyClass() {
        this.userClass = this.userClass;
      },
    },
  };
  </script>