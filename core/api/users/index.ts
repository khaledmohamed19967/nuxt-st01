import axios from "../axios";

export default function useUsers() {
  const getUsersList = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/users")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  return {
    getUsersList,
  };
}
