import useAuthorization from "~/composible/useAuthorization";

export default defineNuxtRouteMiddleware(() => {
  const { token } = useAuthorization();
  // check if token is valid
  if (!token.value) {
    return navigateTo({ path: `/` });
  }
});
