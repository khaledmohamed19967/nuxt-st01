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

      <!-- create todo -->
      <v-text-field
        v-model="formData.task"
        class="mb-5"
        placeholder="create new todo"
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

    const create = () => {
      const { createNewTodo } = useTodos();
      createNewTodo(formData.value)
        .then(() => {
          router.push("/dashboard");
        })
        .catch(() => {});
    };

    return {
      snackbar,
      formData,
      create,
    };
  },
});
</script>
