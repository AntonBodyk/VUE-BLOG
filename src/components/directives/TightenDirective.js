export default {
    bind(el, binding) {
      if (!binding.value) {
        el.style.display = 'none';
      }
    },
    update(el, binding) {
      if (binding.value) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    }
  };