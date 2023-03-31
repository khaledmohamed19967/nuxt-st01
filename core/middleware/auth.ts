import useAuthorization from "~/composables/useAuthorization";

export default defineNuxtRouteMiddleware(() => {
  const { token } = useAuthorization();
  // check if token is valid
  if (!token.value) {
    return navigateTo({ path: `/` });
  }
});
