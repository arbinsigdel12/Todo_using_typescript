import { useState } from "react";
import { Task, TaskStatus, TaskStatuses, updateTaskStatus, deleteTask, editTask,} from "@/features/todos/todoSlice";
import { useAppDispatch } from "@/store/hooks";

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch(editTask({ id: task.id, text: editText }));
      setIsEditing(false);
    }
  };

  return (
    <li className="task-card" key={task.id}>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
        />
      ) : (
        <div className="task-title">{task.text}</div>
      )}

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) =>
            dispatch(
              updateTaskStatus({ id: task.id, status: e.target.value as TaskStatus })
            )
          }
          className="task-select">
          {TaskStatuses.map((s) => (
            <option key={s} value={s}>
              {s.toUpperCase()}
            </option>
          ))}
        </select>

        {isEditing ? (
          <button onClick={handleSaveEdit} className="task-button edit-button">
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              setEditText(task.text);
            }}
            className="task-button edit-button"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="task-button delete-button"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
