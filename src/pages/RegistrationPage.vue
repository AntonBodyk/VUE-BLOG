<template>
    <div>
      <h1 class="registration">Регистрация пользователя</h1>
      <a-form
        :model="this.registrationState"
        name="basic"
        ref="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        style="width: 600px; margin: 100px 0 0 25%;"
        @submit.prevent="registrationUser"
      >
        <a-form-item
          label="Имя"
          name="username"
          :rules="[
            { required: true, message: 'Пожалуйста, введите имя!' },
                {
                    validator: validateName,
                },
            ]"
        >
            <a-input v-model:value="this.registrationState.username" />
        </a-form-item>

        <a-form-item name="email" label="Email" :rules="[
            { required: true, message: 'Пожалуйста, введите адрес электронной почты!' },
            { type: 'email', message: 'Неверный формат электронной почты!' },
            { validator: validateEmail },
        ]">
            <a-input v-model:value="this.registrationState.email" @input="clearEmailValidation" />
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
          <a-input-password v-model:value="this.registrationState.password" />
        </a-form-item>
  
        <a-form-item has-feedback 
            label="Confirm" 
            name="checkPass"
            :rules="[
                { required: true, message: 'Please input your password!' },
                {
                    validator: validatePasswordMatch,
                },
            ]">
            <a-input v-model:value="this.registrationState.checkPass" type="password" autocomplete="off" />
        </a-form-item>
  
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Зарегистрироваться</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script>
  import { instance } from '@/axios/axiosInstance';
  import { message } from 'ant-design-vue';
  export default {
    data() {
      return {
        registrationState: {
            username: '',
            email: '',
            password: '',
            checkPass: '',
        },
      };
    },
    methods: {
        async registrationUser() {
            try {
                const registration = await instance.post('/users', {
                    name: this.registrationState.username,
                    email: this.registrationState.email,
                    password: this.registrationState.password,
                });

                await this.$refs.form.validate();
                console.log('Validation passed, sending API request...');


                console.log('API request succeeded:', registration.data);

                
                this.registrationState = {
                    username: '',
                    email: '',
                    password: '',
                    checkPass: '',
                };

                message.success('Регистрация прошла успешно');
                this.$router.push('/sign');
            } catch (error) {
                console.error('Error during API request:', error);
                message.error('Ошибка при регистрации!');
            }
        },
        validateName(rule, value) {
            
                if(value){
                    const namePattern = /^[А-ЯA-Z][а-яА-ЯA-Za-z]*$/;
                    const containsNumber = /\d/.test(value);

                    if (!containsNumber && namePattern.test(value)) {
                        return Promise.resolve(); 
                    } else {
                        return Promise.reject('Имя должно начинаться с большой буквы и не содержать чисел!');
                    }
                }else{
                    return Promise.resolve();
                }
                
            
        },
        validateEmail(rule, value) {
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
        },
        clearEmailValidation() {
            // Clear email field validation errors
            this.$refs.form.clearValidate('user.email');
        },
        validatePasswordMatch(rule, value) {
            if (value !== this.registrationState.password) {
                return Promise.reject('Пароли не совпадают!');
            }
                return Promise.resolve();
            },
        },
};
  </script>

<style scoped>
    h1{
        margin-top: 50px;
        margin-left: 34%;
        font-size: 40px;
        color: darkcyan;
    }
</style>