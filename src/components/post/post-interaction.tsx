import {
  checkBookmarkedPost,
  checkLikedPost,
  getLikesByPostId,
  getBookmarksByPostId,
  getRepostsByPostId,
  checkRepostedPost,
} from '@/app/(main)/home/actions';
import PostUserActions from './post-user-actions';

type PostInteractionType = {
  postId: string;
  userId: string | undefined;
};

export default async function PostInteraction({
  postId,
  userId,
}: PostInteractionType) {
  if (!userId) {
    return;
  }

  const { data: liked } = await checkLikedPost(postId, userId);
  const { data: likes } = await getLikesByPostId(postId);

  const { data: bookmarked } = await checkBookmarkedPost(postId, userId);
  const { data: bookmarks } = await getBookmarksByPostId(postId);

  const { data: reposted } = await checkRepostedPost(postId, userId);
  const { data: reposts } = await getRepostsByPostId(postId);

  return (
    <PostUserActions
      postId={postId}
      userId={userId}
      liked={liked}
      likes={likes?.length}
      bookmarked={bookmarked}
      bookmarks={bookmarks?.length}
      reposted={reposted}
      reposts={reposts?.length}
    />
  );
}
