<template>
  <!-- login page -->
  <div class="py-4">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <!-- page title -->
      <h1 class="text-center my-3">Login</h1>

      <!-- select user list -->
      <v-select
        v-model="selectedUser"
        return-object
        item-title="name"
        item-value="name"
        :items="usersList"
        class="mb-5"
        placeholder="Select user"
        variant="outlined"
        hide-details
      ></v-select>

      <!-- selected user name and his avatar -->
      <div v-if="selectedUser" class="selected-user mb-5 d-flex align-center">
        <v-avatar outlined size="36px">
          <v-img alt="Avatar" :src="selectedUser.avatar"></v-img>
        </v-avatar>
        <p>{{ selectedUser.name }}</p>
      </div>

      <!-- enter password -->
      <v-text-field
        v-model="password"
        type="password"
        class="mb-5"
        placeholder="Enter your password"
        variant="outlined"
        hide-details
      ></v-text-field>

      <!-- login -->
      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click.prevent="submitLogin"
      >
        Log In
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { ref } from "vue";
import useUsers from "~/api/users";
import useTodos from "~/api/todos";
import useAuthorization from "~/composible/useAuthorization";

definePageMeta({
  middleware: "guest",
});

export default defineComponent({
  setup() {
    const router = useRouter();
    const { usersList, selectedUser } = usersListHandle();

    const password = ref("");

    const submitLogin = () => {
      const { login, setUserData } = useAuthorization();
      const { getUserTodos } = useTodos();

      const userLoginData = {
        userData: { ...selectedUser.value, password: password.value },
      };

      // handle login
      login(userLoginData);

      // get users todos to check if user is existed
      getUserTodos()
        .then(() => {
          setUserData(selectedUser.value);
          router.push("/dashboard");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    };

    return {
      usersList,
      selectedUser,
      password,
      submitLogin,
    };
  },
});

/**
 * this method invoke for handle users selected Data
 * @returns {{usersList: Ref<UnwrapRef<null>>, selectedUser: Ref<UnwrapRef<null>>}}
 */
const usersListHandle = () => {
  const { getUsersList } = useUsers();
  const usersList = ref([]);
  const selectedUser = ref(null);

  onMounted(() => {
    getUsersList()
      .then((response) => {
        usersList.value = response;
      })
      .catch(() => {});
  });

  return {
    usersList,
    selectedUser,
  };
};
</script>
