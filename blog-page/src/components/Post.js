import { useEffect, useState } from "react";
import { format } from "date-fns";
import Comment from "../components/Comment";
import "../styles/Post.css";

function Post(props) {
  const [comments, setComments] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [update, setUpdate] = useState(0);

  async function fetchComments() {
    await fetch(`http://localhost:3000/post/${props.post._id}/comments`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  }

  useEffect(() => {
    fetchComments();
    setUpdate(0)
  }, [update]);

  async function postComment(name, content) {
    await fetch(
      `http://localhost:3000/post/${props.post._id}/comment/create?author=${name}&content=${content}`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUpdate(1);

  }

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.target.reset();
    console.log("handleSubmit ran");
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log("name 👉️", name);
    console.log("content 👉️", content);

    postComment(name, content);
    setName("");
    setContent("");
    // 👇️ clear all input values in the form
  };

  return (
    <div className="Post">
      <div>
        <div className="title">{props.post.title}</div>
        <div className="date">
          <div>{format(new Date(props.post.date), "MMMM do, yyyy ")}</div>
          <div>{format(new Date(props.post.date), "H:mm")}</div>
        </div>
      </div>
      <div className="content">{props.post.content}</div>
      {!commentsVisible && (
        <button
          onClick={() => {
            setCommentsVisible(true);
          }}
        >
          show comments
        </button>
      )}
      <div className="comments">
        {commentsVisible &&
          comments.map((comment,i) => {
            return <Comment comment={comment} key={i}/>;
          })}

        {commentsVisible && (
          <form className="comment-form" onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input
              placeholder="Name"
              name="name"
              id="name"
              required
              onChange={(event) => setName(event.target.value)}
            ></input>
            <label htmlFor="comment"></label>
            <input
              placeholder="Leave a comment..."
              name="comment"
              id="comment"
              required
              onChange={(event) => setContent(event.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        )}

        {commentsVisible && (
          <button
            onClick={() => {
              setCommentsVisible(false);
            }}
          >
            hide comments
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
