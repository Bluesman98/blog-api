import {useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(props) {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [loginError,setLoginError] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.target.reset();
        console.log("handleSubmit ran");
        event.preventDefault(); // 👈️ prevent page refresh
    
        //very basic login verification
        if(userName==='admin' && password === 'dostoevsky') {props.setUser(true); navigate(process.env.PUBLIC_URL + '/posts')}
        else setLoginError(true)
      };
      
    return (
      <div className="Login">
         <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
          placeholder="Username"
          name="username"
          id="username"
          required
          onChange={(event) => setUserName(event.target.value)}
        ></input>
        <label htmlFor="password"></label>
        <input
        type={'password'}
          placeholder="Password"
          name="password"
          id="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        {loginError && <div>Username or Password is incorrect ! </div>}
        <button type="submit">Login</button>
      </form>
      </div>
    );
  }
  
  export default Login;