
import { ToastContainer } from "react-bootstrap";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {

 

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" ></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;