import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost(props) {
  const navigate = useNavigate()
  const params = useParams()
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function deletePost(){
    await fetch(
      `http://localhost:3000/post/${params.id}/delete`,
      {
        method: "DELETE"

      }
    );
    navigate(process.env.PUBLIC_URL + '/posts')
  }

  async function updatePost(title, content) {
    await fetch(
      `http://localhost:3000/post/${params.id}/update?title=${title}&content=${content}`,
      {
        method: "PUT",
      }
    );
    navigate(process.env.PUBLIC_URL + '/posts')
  }

  const handleSubmit = (event) => {
    event.target.reset();
    event.preventDefault(); // 👈️ prevent page refresh

    updatePost(title, content);
  };

  useEffect(() => {
    async function fetchPost() {
        await fetch(`http://localhost:3000/post/${params.id}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setTitle(data.title)
            setContent(data.content)
          });
      }
      fetchPost()

  }, []);

  return (
    <div className="EditPost">
<form className="post-form" onSubmit={handleSubmit}>
            <label htmlFor="title"></label>
            <input
              value={title}
              placeholder="Title"
              name="title"
              required
              onChange={(event) => setTitle(event.target.value)}
            ></input>
            <label htmlFor="content"></label>
            <textarea
              value={content}
              placeholder="Write something..."
              name="content"
              required
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            <button onClick={()=>{deletePost()}}>Delete</button>
            <button type="submit">Submit</button>
          </form>
          
    </div>
  );
}

export default EditPost;