<template>
    <div class="dropdown-select">
    <select v-model="selectedOption">
      <option :value="option" v-for="(option, index) in options" :key="index">{{ option }}</option>
    </select>
  </div>
  </template>
  
  <script>
  export default {
    props: {
      options: Array,
      value: String, 
    },
    computed: {
      selectedOption: {
        get() {
          return this.value;
        },
        set(newValue) {
          this.$emit("input", newValue);
        },
      },
    },
  };
  </script>

  <style scoped>
.dropdown-select {
  font-family: Arial, sans-serif;
}

select {
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
}

select option[disabled] {
  color: #888;
}
  </style>