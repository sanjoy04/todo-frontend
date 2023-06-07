import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Todo from "./Pages/Todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/Todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
