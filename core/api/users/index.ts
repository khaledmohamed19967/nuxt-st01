import axios from "../axios";

export default function useUsers() {
  const getUsersList = async () => {
    try {
      const { data } = await axios.get("/users");
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    getUsersList,
  };
}
