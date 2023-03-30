<template>
  <NuxtPage />
</template>

<script>
definePageMeta({
  layout: "auth",
  middleware: "auth",
});
</script>
