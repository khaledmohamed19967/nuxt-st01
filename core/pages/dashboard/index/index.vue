<template>
  <div>
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
        <v-icon
          v-if="!value.completed"
          icon="mdi-check"
          @click="todoComplete(value.id)"
        />
        <v-icon style="cursor: not-allowed" v-else icon="mdi-close"/>
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
  </div>
</template>

<script>
import useTodos from "~/api/todos";
import GenericAppTable from "~/components/common/tables/GenericAppTable.vue";
export default defineComponent({
  components: {
    GenericAppTable,
  },
  setup() {
    const todoHeader = ref(["Task", "completed", "Actions"]);
    const todoList = ref([]);
    const snackbar = ref({});

    // Fetch
    const fetchToDoList = () => {
      const { getUserTodos } = useTodos();
      getUserTodos()
        .then((response) => {
          todoList.value = response;
        })
        .catch(() => {});
    };

    // Delete
    const deleteTodo = (taskId) => {
      const { deleteSingleTodo } = useTodos();
      deleteSingleTodo(taskId)
        .then((response) => {
          snackbar.value = {
            message: response.message,
            color: "success",
            show: true,
          };
          todoList.value = todoList.value.filter((el) => el.id !== taskId);
        })
        .catch(() => {});
    };

    // Toggle
    const todoComplete = (id) => {
      const { todoCompleted } = useTodos();
      todoCompleted(id)
        .then(() => {
          const selectedIndex = todoList.value.findIndex((el) => el.id === id);
          todoList.value[selectedIndex].completed = true;
        })
        .catch(() => {});
    };

    onMounted(() => {
      fetchToDoList();
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
