export default function useAuthorization() {
  const router = useRouter();

  const token = useCookie("token");
  const userData = useCookie("userData");

  const getUserData = computed(() => userData.value);

  const setUserData = (userDataPayload: any) => {
    userData.value = userDataPayload;
  };
  const logout = () => {
    token.value = "";
    userData.value = null;
    router.push("/");
  };

  const login = (loginPayload: { userData: user }) => {
    token.value = btoa(
      `${loginPayload.userData.username}:${loginPayload.userData.password}`
    );
  };

  return {
    token,
    logout,
    login,
    setUserData,
    getUserData,
  };
}
