export default function useAuth() {
  const login = (payload: user) => {
    const token = useCookie("token");
    token.value = btoa(`${payload.username}:${payload.password}`);
  };

  return {
    login,
  };
}
