export default defineNuxtRouteMiddleware(() => {
  const { value: token } = useCookie("token");

  // check if token is valid
  if (token) {
    return navigateTo({ path: `/dashboard` });
  }
});
