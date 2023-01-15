import {useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost(props) {
  const navigate = useNavigate()
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function postBlogPost(title, content) {
    await fetch(
      `http://localhost:3000/post/create?title=${title}&content=${content}`,
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    navigate(process.env.PUBLIC_URL + '/posts')
  }

  const handleSubmit = (event) => {
    event.target.reset();
    event.preventDefault(); // 👈️ prevent page refresh

    postBlogPost(title, content);
    setTitle("");
    setContent("");
    // 👇️ clear all input values in the form
  };

  return (
    <div className="CreatePost">
<form className="post-form" onSubmit={handleSubmit}>
            <label htmlFor="title"></label>
            <input
              placeholder="Title"
              name="title"
              required
              onChange={(event) => setTitle(event.target.value)}
            ></input>
            <label htmlFor="content"></label>
            <textarea
              placeholder="Write something..."
              name="content"
              required
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
    </div>
  );
}

export default CreatePost;