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
      <h1 class="text-center my-3">Create New Todo</h1>

      <!-- enter password -->
      <v-text-field
        v-model="formData.task"
        class="m-5"
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
        @click.prevent="create"
      >
        Create
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useTodos from "~/api/todos";

export default defineComponent({
  setup() {
    const snackbar = ref({});
    const router = useRouter();
    const formData = ref({});

    const create = async () => {
      const { createNewTodo } = useTodos();
      try {
        await createNewTodo(formData.value);
        router.push("/dashboard/listing");
      } catch (error) {}
    };

    return {
      snackbar,
      formData,
      create,
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
  const selectedUser = ref({});

  onMounted(async () => {
    usersList.value = await getUsersList();
  });

  return {
    usersList,
    selectedUser,
  };
};
</script>
