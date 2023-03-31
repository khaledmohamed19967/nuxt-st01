import axios from "../axios";

export default function useTodos() {
  /**
   * This function invokes for
   * fetch todos list
   */
  const getUserTodos = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/todos")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * This function invokes for
   * delete single todo item
   * @param todoId
   */
  const deleteSingleTodo = (todoId: number) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/todos/${todoId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * This function invokes for
   * create new todo
   */
  const createNewTodo = (taskPayload: {}) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/todos`, taskPayload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * This function invokes for
   * create new todo
   */
  const todoCompleted = (todoId: number) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/todos/${todoId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  return {
    getUserTodos,
    deleteSingleTodo,
    createNewTodo,
    todoCompleted,
  };
}
