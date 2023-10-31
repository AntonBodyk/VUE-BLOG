<template>
    <div>
      <button @click="decrement">-</button>
      <input v-model="this.counterValue" type="number">
      <button @click="increment">+</button>
    </div>
  </template>
  
  <script>
  export default {
    data(){
        return{
            counterValue: 0
        }
    },
    methods: {
      increment() {
        this.counterValue++;
      },
      decrement() {
        this.counterValue--; // Remove the conditional check
      },
    },
  };
  </script>
  
  

  
  
  
  
  
  