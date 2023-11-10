<template>
  <div>
    <h1>Admin Page</h1>
    <div>
      <h2>Список пользователей блога</h2>
      <div class="users-list" v-for="user in users" :key="user.id">
        <transition-group name="user-list">
          <p>{{ user.name }}</p>
          <p>{{ user.email }}</p>
          <div class="button-container">
            <a-button class="del-button" type="primary" danger ghost @click="removeUser(user.id)">Удалить</a-button>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { instance } from '@/axios/axiosInstance';
import { message } from 'ant-design-vue';
import { ref, onMounted } from 'vue';
export default{

  setup(){
    const users = ref([]);

    const getUsers = async () => {
      const response = await instance.get('/users');
      console.log(response.data);

      users.value = response.data;
    };

    const removeUser = async (userId) =>{
            try{
                const deleteUser = await instance.delete(`/users/${userId}`)
                if (deleteUser.status === 200) {
                    users.value = users.value.filter(user => user.id !== userId);
                    message.success('Пользователь успешно удален');
                } else {
                    message.error('Ошибка при удалении пользователя');
                }

            }catch{
                message.error('Ошибка');
            }
    };

    onMounted(() => {
      getUsers();
    });


    return{
      users,
      removeUser
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
  margin-top: 7%;
  font-size: 70px;
}
h2{
  color: brown;
  text-align: center;
  font-size: 30px;
}
.users-list{
  display: flex;
  padding-left: 30%;
  flex-direction: column;
  list-style-type: none;
  margin: 30px 0 20px 100px;
}
.users-list li{
  font-size: 15px;
}
.button-container {
  margin: -45px 0 0 310px;
}

.user-list-enter-active,
.user-list-leave-active {
    transition: all 0.4s ease;
}
.user-list-enter-from,
.user-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
.user-list-move {
    transition: transform 0.8s ease;
}
</style>