<template>
    <div class="toggle" @click="toggleState">
      {{ currentValue }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        state: false,
      };
    },
    computed: {
      currentValue() {
        return this.state ? 'On' : 'Off';
      },
    },
    methods: {
      toggleState() {
        this.state = !this.state;
      },
    },
  };
  </script>
  
  <style scoped>
  .toggle {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }
  </style>