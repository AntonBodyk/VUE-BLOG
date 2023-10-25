<template>
    <div>
      <h1 class="sign">Вход в аккаунт</h1>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        style="width: 600px; margin: 100px 0 0 25%;"
        @submit.prevent="loginUser"
      >
        <a-form-item
          label="Имя"
          name="name"
          :rules="[
            { required: true, message: 'Пожалуйста, введите имя!' },
            { validator: validateName },
          ]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
  
        <a-form-item
          label="Пароль"
          name="password"
          :rules="[
            { required: true, message: 'Пожалуйста, введите пароль!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message: 'Пароль должен содержать хотя бы одну большую букву, одну строчную букву, одну цифру и иметь длину не менее 8 символов!',
            },
          ]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
  
        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember">Запомнить меня</a-checkbox>
        </a-form-item>
  
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Войти</a-button>
        </a-form-item>
      </a-form>
      <p class="registration">Нет аккаунта? <router-link to="/registration">Зарегистрироваться</router-link></p>
    </div>
  </template>
  
  <script>
  import { instance } from '@/axios/axiosInstance';
  import { message } from 'ant-design-vue';
  import { useUserStore } from '@/store/user';
  export default {
    data() {
      return {
        formState: {
          name: '',
          password: '',
          remember: false,
        },
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await instance.post('/auth/login', {
            name: this.formState.name,
            password: this.formState.password,
          });
  
          
          if (response.data && response.data.token) {
           
            const token = response.data.token; 
            const userStore = useUserStore();
            
            userStore.setToken(token);
            userStore.setUserData(response.data.user);

            message.success('Вход выполнен!');
            this.$router.push('/');
            this.formState.name = '';
            this.formState.password = '';
            this.formState.remember = false;
          } else {
            message.error('Ошибка, вход не выполнен!');
          }
        } catch (error) {
          message.error('Ошибка сервера!');
        }
      },
      validateName(rule, value) {
        
          if(value){
            const namePattern = /^[А-ЯA-Z][а-яА-ЯA-Za-z]*$/;
    
            if (namePattern.test(value)) {
              return Promise.resolve();
            } else {
              return Promise.reject('Имя должно начинаться с большой буквы!');
            }
          }else{
            return Promise.resolve();
          }
          
      },
    },
  };
  </script>

<style scoped>
    h1{
        margin: 50px 0 0 43%;
        font-size: 40px;
        color: darkcyan;
    }
    .registration{
        margin: 50px 0 0 43%;
    }
    .registration a{
        color: cadetblue;
        text-decoration: none;
    }
</style>

