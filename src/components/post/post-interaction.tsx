import {
  checkForAlreadyLikedPost,
  getAllLikesByPostId,
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

  const { data: liked } = await checkForAlreadyLikedPost(postId, userId);
  const { data: likes } = await getAllLikesByPostId(postId);

  return (
    <PostUserActions
      postId={postId}
      userId={userId}
      likes={likes?.length}
      liked={liked}
    />
  );
}
