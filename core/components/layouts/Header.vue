<template>
  <v-layout>
    <div class="mb-10">
      <v-app-bar class="" color="primary" density="compact">
        <v-app-bar-title>
          <!--        <v-avatar outlined size="36px">-->
          <!--          <v-img-->
          <!--            alt="Avatar"-->
          <!--            :src="selectedUser.avatar"-->
          <!--          ></v-img>-->
          <!--        </v-avatar>-->
          <p>khaled mohmaed</p>
        </v-app-bar-title>

        <!-- login and logout button -->
        <v-btn @click="toggleAuth"> {{ isLoggedIn ? "Logout" : "Login" }}</v-btn>
      </v-app-bar>
    </div>
  </v-layout>
</template>

<script>
export default defineComponent({
  setup() {
    const router = useRouter();
    const {value: token} = useCookie("token");
    const isLoggedIn = ref(false);

    const toggleAuth = () => {
      if (isLoggedIn) token.value = atob(token.value);
      router.push('/')
    }

    onMounted(() => {
      if (token) isLoggedIn.value = true;
    })

    return {
      isLoggedIn,
      toggleAuth
    }
  }
})
</script>
