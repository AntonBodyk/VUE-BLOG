const myMixin = {
    data() {
      return {
        mixinData: 'Вот и миксин!',
      };
    },
    methods: {
      greetMixin() {
        console.log('Привет,я миксин!');
      },
      showAlert(message) {
        alert(message);
      },
    },
    computed: {
      computedMixinData() {
        return `Данные из миксина: ${this.mixinData}`;
      },
    },
  };