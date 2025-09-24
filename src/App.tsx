import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TodoBoard from "./pages/TodoBoard/TodoBoard";
import TodoOverview from "./components/TodoOverview/TodoOverview";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoOverview />} />
        <Route path="/todo-board" element={<TodoBoard />} />
      </Routes>
    </>
  );
}

export default App;
