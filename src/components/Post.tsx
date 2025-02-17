import Link from "next/link";
import React from "react";

export interface PostProps {
  id: string
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number,
    dislikes: number
  },
  views: number
}

const Post: React.FC<PostProps> = ({id, title, body, tags, reactions, views}) => {

  const snippet = (body && body.length > 100) ? body.substring(0, 100) + '...' : body

  // return (
  //   <div className="bg-white p-6 rounded-lg w-full shadow-lg hover:shadow-xl duration-300">
  //     <Link href={`/posts/${id}`}>
  //       <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">
  //         {title}
  //       </h2>
  //     </Link>
  //     <p className="text-gray-700 mt-2">{snippet}</p>
  //   </div>
  // );

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 w-full">
      <Link href={`/posts/${id}`} className="text-2xl font-semibold text-gray-900 p-4 hover:text-blue-500">
        {title}
      </Link>

      <p className="text-gray-700 p-4 text-base">{snippet}</p>

      <div className="flex flex-wrap gap-2 p-4">
        {tags.map((tag, index) => (
          <span key={index} className="text-sm text-white bg-blue-500 rounded-full px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="text-gray-600">👍</span>
            <span className="ml-1 text-gray-700">{reactions.likes}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">👎</span>
            <span className="ml-1 text-gray-700">{reactions.dislikes}</span>
          </div>
        </div>
        <div className="text-gray-600 text-sm">{views} views</div>
      </div>
    </div>
  );
}

export default Post
