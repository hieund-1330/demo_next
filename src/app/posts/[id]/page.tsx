import Comments from "@/components/Comments";
import { PostProps } from "@/components/Post";
import { fetchCommentsForPost, fetchPost, fetchPosts } from "@/libs/api";

export const revalidate = 60;

export const dynamicParams = false;

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await fetchPost(id);
  const comments = await fetchCommentsForPost(id);
  return (
    <div className="container mx-auto p-4 text-black">
      <article className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg">{post.body}</p>
      </article>

      <section>
        <Comments comments={comments} />
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const posts: PostProps[] = await fetchPosts();
  return posts.map((post) => ({
    id: String(post.id),
  }));
}
