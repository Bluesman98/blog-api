import "./App.css";
import { useEffect, useState } from "react";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      await fetch("http://localhost:3000/posts")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPosts(data);
        });
    }

    fetchPosts();
  }, []);

  return (
    <div className="App">
      {posts !== null &&
        posts.map((post,i) => {
          return <Post post={post} key={i}/>;
        })}
    </div>
  );
}

export default App;
