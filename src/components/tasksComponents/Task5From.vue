<template>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="formData.name" />
        <div class="error-message">{{ errors.name }}</div>
      </div>
  
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="formData.email" />
        <div class="error-message">{{ errors.email }}</div>
      </div>
  
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="formData.password" />
        <div class="error-message">{{ errors.password }}</div>
      </div>
  
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          password: '',
        },
        errors: {
          name: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        let valid = true;
  
        if (!this.formData.name) {
          this.errors.name = 'Введите имя.';
          valid = false;
        }
  
        if (!this.formData.email) {
          this.errors.email = 'Введите email.';
          valid = false;
        } else if (!this.isValidEmail(this.formData.email)) {
          this.errors.email = 'Введите правильный формат электронной почты.';
          valid = false;
        }
  
        if (!this.formData.password) {
          this.errors.password = 'Введите пароль.';
          valid = false;
        }
  
        return valid;
      },
      isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      },
      submitForm() {
        if (this.validateForm()) {
          console.log('Form data:', this.formData);
          this.formData = {
          name: '',
          email: '',
          password: '',
        }
        } else {
          console.log('Form is invalid');
        }
      },
    },
  };
  </script>