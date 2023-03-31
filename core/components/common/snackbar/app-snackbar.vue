<template>
  <v-snackbar v-model="showSnackBar" close-delay="4000">
    {{ text }}
  </v-snackbar>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    text: { type: String, require: true, default: "snackbar app" },
  },

  setup() {
    const showSnackBar = ref(true);
    return {
      showSnackBar,
    };
  },
});
</script>
