import {Task,TaskStatus,archiveCompleted} from "@/features/todos/todoSlice";
import { useAppDispatch } from "@/store/hooks";
import TaskCard from "@/pages/TodoBoard/TaskCard";

type TaskStatusProps = {
  status: TaskStatus;
  tasks: Task[];
};

const TaskStatusColumn: React.FC<TaskStatusProps> = ({ status, tasks }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="column">
      <h3>{status.toUpperCase()}</h3>

      {status === "completed" && tasks.length > 0 && (
        <button
          onClick={() => dispatch(archiveCompleted())}
          className="archive-button"
        >
          Archive All
        </button>
      )}

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskStatusColumn;
