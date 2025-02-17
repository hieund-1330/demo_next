import Comment, { CommentProps } from "./Comment";

interface CommentsProps {
  comments: CommentProps[];
}

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            likes={comment.likes}
            body={comment.body}
            user={comment.user}
          />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;
