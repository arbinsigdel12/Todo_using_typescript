import { useState } from "react";
import { addTask, editTask, deleteTask, updateTaskStatus,TaskStatuses, TaskStatus } from "@/features/todos/todoSlice";
import "./TodoCard.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function TodoOverview() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.todo.tasks);

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTask(input));
      setInput("");
    }
  };

  const handleSaveEdit = (id: number) => {
    if (editText.trim()) {
      dispatch(editTask({ id, text: editText }));
      setEditingId(null);
      setEditText("");
    }
  };

  const handleToggle = (taskId: number, currentStatus: TaskStatus) => {
    const currentIndex = TaskStatuses.indexOf(currentStatus);
    const nextStatus: TaskStatus = TaskStatuses[(currentIndex + 1) % TaskStatuses.length];
    dispatch(updateTaskStatus({ id: taskId, status: nextStatus }));
  };

  return (
    <div className="todo-section">
      <div className="todo-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filter-view-all">
        <button>Filter</button>
        <button onClick={() => navigate("/todo-board")}>View All</button>
      </div>

      <div className="todo-card">
        <ul className="heading">
          <li>Task</li>
          <li>Status</li>
          <li>Action</li>
        </ul>
        <div className="todos">
          {tasks.slice(-4).reverse().map((task) => (
            <ul key={task.id}>
              <li>
                {editingId === task.id ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span className={task.status === "completed" ? "completed" : ""}>
                    {task.text}
                  </span>
                )}
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => handleToggle(task.id, task.status)}
                />
              </li>
              <li>
                {editingId === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="task-button edit-button"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(task.id);
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
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoOverview;
