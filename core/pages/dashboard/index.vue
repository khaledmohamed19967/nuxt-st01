<template>
  <!-- page title -->
  <h1 class="text-center my-3">Todo List</h1>
  <!-- Generic App Table -->
  <generic-app-table :table-header="todoHeader" :table-data="todoList">
    <template v-slot:actions="{id}">
      <v-icon @click="deleteTodo(id)" class="mx-2" icon="mdi-delete" />
      <v-icon icon="mdi-plus" />
    </template>
  </generic-app-table>

</template>

<script>
import useTodos from "~/api/todos";
import SvgIcon from '@jamescoyle/vue-icon';
import GenericAppTable from "~/components/common/tables/GenericAppTable.vue";

definePageMeta({
  layout: "auth",
});
export default defineComponent({
  components: {
    GenericAppTable,
    SvgIcon,
  },
  setup() {
    const todoHeader = ref(['Task','completed', 'Actions']);
    const todoList = ref([]);

    const fetchToDoList = async () => {
      const {getUserTodos} = useTodos();
      try {
        todoList.value = await getUserTodos();
      } catch(e){}
    }

    const deleteTodo = async (task_id) => {
      console.log(task_id);
      const {deleteSingleTodo} = useTodos();
      try {
        const response = await deleteSingleTodo(task_id);
        console.log(response);

      } catch(e) {
        console.log(e.response, 'dd');

      }
    }



    onMounted(async () => {
      await fetchToDoList();
    })

    return {
      todoList,
      todoHeader,
      deleteTodo,
    }
  }
})
</script>