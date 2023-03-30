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
      throw new Error(error);
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
     return error.response.data
    }
  };

  return {
    getUserTodos,
    deleteSingleTodo,
  };
}
