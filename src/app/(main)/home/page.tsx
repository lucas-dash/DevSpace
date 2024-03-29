import Post from "@/components/post/post";
import CreatePost from "@/components/post/create-post";
import { readPosts } from "./actions";

export const revalidate = 300;

export default async function Main() {
  const { data: posts } = await readPosts();

  return (
    <section className="flex flex-col gap-5">
      <CreatePost />
      {posts?.map((post: Post) => <Post key={post.id} {...post} />)}
    </section>
  );
}
