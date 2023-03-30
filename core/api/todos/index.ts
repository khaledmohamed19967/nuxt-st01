import axios from "../axios";

export default function useTodos() {
  /**
   * This function invokes for
   * fetch todos list
   */
  const getUserTodos = async () => {
    try {
      const { data } = await axios.get("/todos");
      return data;
    } catch (error: any) {
      return error.response.data.message;
    }
  };

  /**
   * This function invokes for
   * delete single todo item
   * @param todo_id
   */
  const deleteSingleTodo = async (todo_id: number) => {
    try {
      const { data } = await axios.delete(`/todos/${todo_id}`);
      return data;
    } catch (error: any) {
      return error.response;
    }
  };

  /**
   * This function invokes for
   * create new todo
   */
  const createNewTodo = async (taskPayload) => {
    try {
      const { data } = await axios.post(`/todos`, taskPayload);
      return data;
    } catch (error: any) {
      return error.response.data.message;
    }
  };

  /**
   * This function invokes for
   * create new todo
   */
  const todoCompleted = async (todo_id) => {
    try {
      const { data } = await axios.put(`/todos/${todo_id}`);
      return data;
    } catch (error: any) {
      return error.response.data.message;
    }
  };

  return {
    getUserTodos,
    deleteSingleTodo,
    createNewTodo,
    todoCompleted
  };
}
