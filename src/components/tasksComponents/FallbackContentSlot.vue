<template>
    <div class="slot-component">
      <slot name="header">
        <div class="fallback-header">
          <h2>Fallback Header</h2>
        </div>
      </slot>
      <slot name="content">
        <div class="fallback-content">
          <p>Fallback Text</p>
        </div>
      </slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "FallbackSlotComponent",
  };
  </script>
  
  <style scoped>
  .slot-component {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  
  .fallback-header {
    background-color: #f0f0f0;
    padding: 10px;
  }
  
  .fallback-content {
    padding: 10px;
  }
  </style>