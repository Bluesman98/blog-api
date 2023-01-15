import "./App.css";
import { useEffect, useState } from "react";
import Posts from "./components/Posts";
import { set } from "date-fns";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, redirect } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import EditPost from "./components/EditPost";

function App() {
  const [user,setUser] = useState(false)

  return (
    <BrowserRouter>
    <div className="App">

 <Routes>
      <Route path={process.env.PUBLIC_URL + "/"} element={<Navigate to={process.env.PUBLIC_URL + "/login"} />} />
      <Route path={process.env.PUBLIC_URL + "/login"} element={<Login setUser={setUser}/>} />
      <Route path={process.env.PUBLIC_URL + "/post/create"} element={<CreatePost/>} />
      <Route path={process.env.PUBLIC_URL + "/posts"} element={<Posts user={user}/>} />
      <Route path={process.env.PUBLIC_URL + "/post/:id"} element={<EditPost/>} />
    </Routes>
    </div>
   
    </BrowserRouter>
  );
 
}

export default App;
