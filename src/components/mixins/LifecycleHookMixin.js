const lifecycleLoggerMixin = {
    created() {
      console.log(`Component created: ${this.$options.name || 'Anonymous'}`);
    },
    destroyed() {
      console.log(`Component destroyed: ${this.$options.name || 'Anonymous'}`);
    },
  };
  
  export default lifecycleLoggerMixin;