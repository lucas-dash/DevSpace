import Post from "@/components/post/post";
import EmptyState from "@/components/ui/state/empty-state";
import { readPosts } from "../../home/actions";

type UsersPostsType = {
  profileId: string;
};

export default async function UsersPosts({ profileId }: UsersPostsType) {
  const { data: posts } = await readPosts(profileId);

  return (
    <section className="flex flex-col gap-5">
      {posts?.length === 0 || !posts ? (
        <EmptyState title="No Posts Yet!" image className="text-base" />
      ) : (
        posts?.map((post) => <Post key={post.id} {...post} />)
      )}
    </section>
  );
}
