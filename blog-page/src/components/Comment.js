import "../styles/Comment.css"
import { format } from "date-fns";

function Comment(props) {
  return (
    <div className="Comment">
         <div>
             <div className="author">{props.comment.author}</div>
                     <div className="date">
                         <div>{format(new Date(props.comment.date), 'H:mm' )}</div>
                         <div>{format(new Date(props.comment.date), 'MM/dd/yy' )}</div>
                     </div>
         </div>
        <div>{props.comment.content}</div>
    </div>
  );
}

export default Comment;