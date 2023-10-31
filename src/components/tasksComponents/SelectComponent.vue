<template>
    <select v-model="selectedOption">
      <option v-for="(option, index) in options" :value="option" :key="index">{{ option }}</option>
    </select>
</template>
  
<script>
  export default {
    props: {
      options: Array,
      value: String,
    },

    data() {
      return {
        selectedOption: this.value,
      };
    },
    watch: {
      selectedOption(newValue) {
        this.$emit('input', newValue);
      },
    },
  };
  </script>

<style scoped>
select{
    width: 100px;
    height: 50px;
    border-radius: 5px;
}
</style>