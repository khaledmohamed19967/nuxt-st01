<template>
  <div>
    <AppHeader />
    <slot />
  </div>
</template>
<script>
import AppHeader from "@/components/layouts/Header.vue";
export default defineComponent({
  components: {
    AppHeader,
  },
});
</script>
