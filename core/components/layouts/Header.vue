<template>
  <v-layout>
    <div class="mb-10">
      <v-app-bar class="" color="primary" density="compact">
        <v-app-bar-title>
          <div class="d-flex align-center">
            <v-avatar outlined size="36px">
              <v-img alt="Avatar" :src="getUserData.avatar"></v-img>
            </v-avatar>
            <p style="font-size: 14px">{{ getUserData.name }}</p>
          </div>
        </v-app-bar-title>

        <!-- login and logout button -->
        <v-btn @click="toggleAuth">
          {{ getUserData ? "Logout" : "Login" }}</v-btn
        >
      </v-app-bar>
    </div>
  </v-layout>
</template>

<script>
import useAuthorization from "~/composible/useAuthorization";

export default defineComponent({
  setup() {
    const { logout, getUserData } = useAuthorization();

    const toggleAuth = () => {
      if (getUserData) logout();
    };

    return {
      getUserData,
      toggleAuth,
    };
  },
});
</script>
