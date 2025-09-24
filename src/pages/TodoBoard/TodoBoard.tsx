import { useAppSelector } from "@/store/hooks";
import { TaskStatuses, TaskStatus } from "@/features/todos/todoSlice";
import TaskStatusColumn from "@/features/todos/TaskStatus";
import "./TodoBoard.css";

function TodoBoard() {
  const tasks = useAppSelector((state) => state.todo.tasks);

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="todo-board">
      <h2 className="heading">Todo Board</h2>
      <div className="columns">
        {TaskStatuses.map((status) => (
          <TaskStatusColumn
            key={status}
            status={status}
            tasks={tasksByStatus(status)}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoBoard;
