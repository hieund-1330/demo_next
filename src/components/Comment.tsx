export interface CommentProps {
  id: string | number
  body: string
  likes: number
  user: {
    username: string
    fullName: string
  }
}

const Comment: React.FC<CommentProps> = ({body, likes, user}) => {
  return (
    <div className="flex flex-col space-y-4 border-b pb-4">
      <div className="flex items-center space-x-2">
        <div className="text-sm font-semibold text-gray-700">{user.fullName}</div>
        <div className="text-sm text-gray-500">@{user.username}</div>
      </div>

      <p className="text-gray-800">{body}</p>

      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>{likes} Likes</span>
        <button className="text-blue-500 hover:text-blue-700">Like</button>
      </div>

      <div className="text-xs text-gray-400">Comment by {user.fullName}</div>
    </div>
  );
}
// const Comment = ({ body, likes, user }: CommentProps) => {
//   return (
//     <div className="border-b py-4 text-black">
//       <div className="font-semibold">{email}</div>
//       <p className="text-gray-700">{name}</p>
//       <p className="text-gray-700">{body}</p>
//     </div>
//   );
// };

export default Comment;
