<template>
  <v-table density="compact">
    <!-- table head -->
    <thead>
    <tr>
      <th v-for="head in tableHeader" class="text-left">
        {{ head }}
      </th>
    </tr>
    </thead>
    <!-- table body -->
    <tbody>
    <tr
      v-for="task in tableData"
      :key="task.name"
    >
      <td>{{ task.task || 'No task title' }}</td>
      <td>{{ task.completed }}</td>
      <td>
        <slot name="actions" :id="task.id"></slot>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
export default defineComponent({
  props: {
    tableHeader: {type: Object, require: true},
    tableData: { type: Object, require: true }
  }
})
</script>