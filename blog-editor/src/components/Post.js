import { useEffect, useState } from "react";
import { format } from "date-fns";
import Comment from "../components/Comment";
import "../styles/Post.css";
import { useNavigate } from "react-router-dom";

function Post(props) {
  const navigate = useNavigate()
  const [comments, setComments] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [update, setUpdate] = useState(0);

  async function fetchComments() {
    await fetch(`http://localhost:3000/post/${props.post._id}/comments`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
      });
  }

  useEffect(() => {
    fetchComments();
    setUpdate(0)
  }, [update]);

  return (
    <div className="Post">
      <div>
        <div className="title">{props.post.title}</div>
        <div className="date">
          <div>{format(new Date(props.post.date), "MMMM do, yyyy ")}</div>
          <div>{format(new Date(props.post.date), "H:mm")}</div>
          <button onClick={()=>{navigate(process.env.PUBLIC_URL + '/post/' + props.post._id)}}>Edit</button>
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
            return <Comment comment={comment} key={i} setUpdate={setUpdate} />;
          })}


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
