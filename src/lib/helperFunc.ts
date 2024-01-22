export function formatRelativeTime(isoTimestamp: string): string {
  const timestampDate = new Date(isoTimestamp);
  const timestamp = Math.floor(timestampDate.getTime() / 1000); // Convert to seconds
  const now = Math.floor(Date.now() / 1000);
  const elapsedSeconds = now - timestamp;

  if (elapsedSeconds < 60) {
    return 'just now';
  } else if (elapsedSeconds < 3600) {
    const minutes = Math.floor(elapsedSeconds / 60);
    return `${minutes}m ago`;
  } else if (elapsedSeconds < 86400) {
    const hours = Math.floor(elapsedSeconds / 3600);
    return `${hours}h ago`;
  } else {
    return timestampDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}

export const linkUrlChecker = (socLink: string) => {
  if (!socLink.includes('https://')) {
    return `https://${socLink}`;
  } else {
    return socLink;
  }
};

export function notifyTypeCheck(
  event_type:
    | 'likes'
    | 'follows'
    | 'reposts'
    | 'bookmarks'
    | 'comments'
    | 'replyComment'
    | string
) {
  if (event_type === 'follows') {
    return 'started following you.';
  } else if (event_type === 'likes') {
    return 'like your post.';
  } else if (event_type === 'reposts') {
    return 'reposted your post.';
  } else if (event_type === 'comments') {
    return 'comment your post.';
  } else if (event_type === 'replyComment') {
    return 'reply to your comment.';
  } else if (event_type === 'bookmarks') {
    return 'bookmarked your post.';
  } else if (typeof event_type === 'string') {
    return 'send you notification';
  }
}

export function validFileType(file: File) {
  const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];
  return allowedExtensions.includes(file.type);
}

export function validFileSize(file: File, maxSizeInBytes: number) {
  return file.size <= maxSizeInBytes;
}
