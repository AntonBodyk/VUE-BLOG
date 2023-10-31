<template>
    <div>
      <form>
        <div class="form-group">
          <label for="textValue">Text Input:</label>
          <input
            id="textValue"
            type="text"
            v-model="textModel"
          />
        </div>
  
        <div class="form-group">
          <label for="numberValue">Number Input:</label>
          <input
            id="numberValue"
            type="number"
            v-model="numberModel"
          />
        </div>
  
        <div class="form-group">
          <label for="checkboxValue">Checkbox:</label>
          <input
            id="checkboxValue"
            type="checkbox"
            v-model="checkboxModel"
          />
        </div>
      </form>
  
      <div class="result">
        <h3>Model Values:</h3>
        <p>Text Input Model: {{ textModel }}</p>
        <p>Number Input Model: {{ numberModel }}</p>
        <p>Checkbox Model: {{ checkboxModel }}</p>
      </div>
  
      <button @click="changeModelValues">Change Model Values</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        textModel: 'Default Text',
        numberModel: 42,
        checkboxModel: false,
      };
    },
    methods: {
      changeModelValues() {
        this.textModel = 'Updated Text';
        this.numberModel = 99;
        this.checkboxModel = !this.checkboxModel;
      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 10px;
  }
  
  .result {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
  }
  </style>