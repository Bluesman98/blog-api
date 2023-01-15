import "../styles/Comment.css"
import { format } from "date-fns";

function Comment(props) {
  async function deleteComment(){
    await fetch(
      `http://localhost:3000/comment/${props.comment._id}/delete`,
      {
        method: "DELETE"

      }
    );
   await props.setUpdate(1)
  }
  return (
    <div className="Comment">
         <div>
             <div className="author">{props.comment.author}</div>
                     <div className="date">
                         <div>{format(new Date(props.comment.date), 'H:mm' )}</div>
                         <div>{format(new Date(props.comment.date), 'MM/dd/yy' )}</div>
                     </div>
                     <button onClick={()=>{deleteComment()}}>delete</button>
         </div>
        <div>{props.comment.content}</div>
    </div>
  );
}

export default Comment;