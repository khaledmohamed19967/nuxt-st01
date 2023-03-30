<template>
  <!-- page title -->
  <h1 class="text-center my-3">Todo List</h1>

  <!-- create new task button -->
  <v-btn class="mb-8" @click="$router.push('/dashboard/create-todo')">
    Create new task
  </v-btn>

  <!-- Generic App Table -->
  <generic-app-table :table-header="todoHeader" :table-data="todoList">
    <template #actions="{ value }">
      <v-icon class="mx-2" icon="mdi-delete" @click="deleteTodo(value.id)" />
      <v-icon v-if="!value.completed" icon="mdi-check" @click="todoComplete(value.id)"/>
      <v-icon v-else icon="mdi-plus"/>
    </template>
  </generic-app-table>

  <!-- page snackbar -->
  <v-snackbar
    v-model="snackbar.show"
    close-delay="4000"
    :color="snackbar.color"
  >
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import useTodos from "~/api/todos";
import GenericAppTable from "~/components/common/tables/GenericAppTable.vue";
import Snackbar from "~/components/common/snackbar/snackbar";

export default defineComponent({
  components: {
    Snackbar,
    GenericAppTable,
    SvgIcon,
  },
  setup() {
    const todoHeader = ref(["Task", "completed", "Actions"]);
    const todoList = ref([]);
    const snackbar = ref({});

    // Fetch
    const fetchToDoList = async () => {
      const { getUserTodos } = useTodos();
      try {
        todoList.value = await getUserTodos();
      } catch (e) {}
    };

    // Delete
    const deleteTodo = async (task_id) => {
      const { deleteSingleTodo } = useTodos();
      const response = await deleteSingleTodo(task_id);
      snackbar.value = {
        message: response.message,
        color: "success",
        show: true,
      };
      todoList.value = todoList.value.filter((el) => el.id !== task_id);
    };

    // Toggle
    const todoComplete = async (id) => {
      const { todoCompleted } = useTodos();
      try  {
        await todoCompleted(id);
        const selectedIndex = todoList.value.findIndex((el) => el.id === id);
        todoList.value[selectedIndex].completed = true;
      } catch(e) {}
    };

    onMounted(async () => {
      await fetchToDoList();
    });

    return {
      todoList,
      todoHeader,
      deleteTodo,
      snackbar,
      todoComplete,
    };
  },
});
</script>
