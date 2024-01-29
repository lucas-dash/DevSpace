import { getUserDataById } from "@/lib/actions";
import { formatRelativeTime, notifyTypeCheck } from "@/lib/helper-function";
import Link from "next/link";

type UserInfoType = {
  createdBy: string;
  createdAt: string;
  eventType?: string;
  linkToPost?: string;
};

export default async function UserInfo({
  createdBy,
  createdAt,
  eventType,
  linkToPost,
}: UserInfoType) {
  const { data: userData } = await getUserDataById(createdBy);

  return (
    <div
      className={`${eventType ? "" : "flex items-center gap-1 sm:gap-1.5 flex-wrap"}`}
    >
      <Link
        href={`/${userData?.username}`}
        className="hover:underline font-semibold"
      >
        {userData?.display_name}
      </Link>
      {!eventType && (
        <Link
          href={`/${userData?.username}`}
          className="text-fadeText dark:text-fadeText-dark hover:underline max-[380px]:text-sm"
        >
          {`@${userData?.username}`}
        </Link>
      )}

      {eventType && (
        <Link
          href={linkToPost || ""}
          className={`${
            linkToPost !== "" ? "hover:underline" : "cursor-default"
          }`}
        >
          <p className="inline px-1">{notifyTypeCheck(eventType)}</p>
        </Link>
      )}
      <p
        className={`text-sm max-[370px]:hidden max-[420px]:text-xs ${eventType ? "font-medium inline-block" : ""}`}
        aria-label="created at"
      >
        <span className="mr-1">&#x2022;</span>
        {formatRelativeTime(createdAt)}
      </p>
    </div>
  );
}
