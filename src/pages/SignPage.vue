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
          label="Эл. почта"
          name="email"
          :rules="[
            { required: true, message: 'Пожалуйста, введите электронный адрес!' },
            { validator: validateEmail },
          ]"
        >
          <a-input v-model:value="formState.email" />
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
  import {ref, getCurrentInstance} from 'vue';

  export default {
    setup(){
      const formState = ref({
          email: '',
          password: '',
          remember: false,
        });

        const router = getCurrentInstance().appContext.config.globalProperties.$router;

        const loginUser = async () => {
          try {
            const response = await instance.post('/auth/login', {
              email: formState.value.email,
              password: formState.value.password,
            });
    
            if (response.data && response.data.token) {
            
              const token = response.data.token; 
              const userStore = useUserStore();
              
              userStore.setToken(token);
              

              message.success('Вход выполнен!');
              
              userStore.setUser(response.data);

              router.push('/');
              formState.value.name = '';
              formState.value.password = '';
              formState.value.remember = false;
            } else {
              message.error('Ошибка, вход не выполнен!');
            }
          } catch (error) {
              message.error('Ошибка сервера!');
          }
      };

      const validateEmail = (rule, value) => {
                if(value){
                    const emailPattern = /@/;

                    if (emailPattern.test(value)) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('Адрес электронной почты должен содержать символ "@"!');
                    }
                }else{
                    return Promise.resolve();
                }
      };

      return{
        formState,
        loginUser,
        validateEmail
      }
    }
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

