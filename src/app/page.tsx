'use client'
import Post, { PostProps } from "@/components/Post";
import { fetchPosts } from "@/libs/api";
import { useEffect, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchPosts()
      setPosts(data)
    }
    loadPosts()
  }, [])

  return (
    <div
      className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl"
    >
      <main className="flex flex-col gap-8 my-6 row-start-2 items-center sm:items-start">
        {
          posts.slice(0, 20).map((post: PostProps) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                tags={post.tags}
                reactions={post.reactions}
                views={post.views}
              />
            )
          })
        }
      </main>
    </div>
  );
}
