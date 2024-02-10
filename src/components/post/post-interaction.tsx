import {
  checkBookmarkedPost,
  checkLikedPost,
  getLikesByPostId,
  getBookmarksByPostId,
  getRepostsByPostId,
  checkRepostedPost,
} from "@/app/(main)/home/actions";
import { getUser } from "@/lib/actions";
import { getPostCommentsNumber } from "@/app/(main)/home/[postId]/actions/comments";
import CommentButton from "../features/comment-button";
import RepostButton from "./repost-button";
import LikeButton from "../features/like-button";
import BookmarkButton from "./bookmark-button";

type PostInteractionType = {
  postId: string;
  createdBy: string;
};

export default async function PostInteraction({
  postId,
  createdBy,
}: PostInteractionType) {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return;
  }

  const likedPromise = checkLikedPost(postId, user.id);
  const likesPromise = getLikesByPostId(postId);

  const [likedResponse, likesResponse] = await Promise.all([
    likedPromise,
    likesPromise,
  ]);

  const { data: bookmarked } = await checkBookmarkedPost(postId, user.id);
  const { data: bookmarks } = await getBookmarksByPostId(postId);

  const { data: reposted } = await checkRepostedPost(postId, user.id);
  const { data: reposts } = await getRepostsByPostId(postId);

  const { data: comments } = await getPostCommentsNumber(postId);

  return (
    <div className="flex items-center justify-between min-[390px]:justify-evenly ">
      <CommentButton
        comments={comments?.length}
        postId={postId}
        userId={user.id}
        aria-label="link to comments of this post"
      />

      <RepostButton
        createdBy={createdBy}
        userId={user.id}
        postId={postId}
        reposted={reposted}
        reposts={reposts?.length}
      />

      <LikeButton
        createdBy={createdBy}
        userId={user.id}
        postId={postId}
        likedRes={likedResponse}
        likesRes={likesResponse}
      />

      <BookmarkButton
        bookmarked={bookmarked}
        bookmarks={bookmarks?.length}
        createdBy={createdBy}
        userId={user.id}
        postId={postId}
      />
    </div>
  );
}
