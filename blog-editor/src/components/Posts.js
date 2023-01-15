import Post from "../components/Post"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Posts(props) {
    const [posts, setPosts] = useState(null);

    async function fetchPosts() {
        await fetch("http://localhost:3000/posts")
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setPosts(data);
          });
      }
    
      useEffect(() => {
        fetchPosts();
      }, []);

    return (

          <div className="Posts">
            <Link to={process.env.PUBLIC_URL + "/post/create"}>New Post</Link>
            {posts!==null &&posts.map((post,i) => {
              return <Post post={post} key={i} />;
            })}
          </div>
    );
  }
  
  export default Posts;