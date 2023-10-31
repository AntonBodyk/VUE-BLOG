<template>
    <div class="custom-component">
      <div class="header">
        <slot name="header">
            <h2>Hello, slot vue!</h2>
        </slot>
      </div>
      <div class="content">
        <slot name="content">
            <p>Text Content Slot</p>
        </slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CustomComponent",
  };
  </script>
  
  <style scoped>
  .custom-component {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  
  .header {
    background-color: #f0f0f0;
    padding: 10px;
  }
  
  .content {
    padding: 10px;
  }
  </style>