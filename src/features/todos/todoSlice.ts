import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: number;
  text: string;
  status: TaskStatus;
}

interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({ id: Date.now(), text: action.payload, status: "todo" });
    },
    editTask: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.text = action.payload.text;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: number; status: TaskStatus }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    archiveCompleted: (state) => {
      state.tasks = state.tasks.filter((t) => t.status !== "completed");
    },
  },
});

export const { addTask, editTask, deleteTask, updateTaskStatus, archiveCompleted } = todoSlice.actions;
export default todoSlice.reducer;
export const TaskStatuses: TaskStatus[] = ["todo", "in-progress", "completed"];
