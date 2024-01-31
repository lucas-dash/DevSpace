import Link from "next/link";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { getUser } from "@/lib/actions";
import AuthState from "@/components/ui/state/auth-state";
import FollowButton from "./follow-button";
import SendEmail from "./send-email";
import { checkForFollowedUser } from "../actions";

type ProfileActionsType = {
  profileId: string;
  hireEmail: string | null;
  username: string;
};

export default async function ProfileActions({
  profileId,
  hireEmail,
  username,
}: ProfileActionsType) {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return <AuthState />;
  }

  const { data } = await checkForFollowedUser(user?.id, profileId);

  const isUserProfile =
    user.user_metadata.username === username ||
    user.user_metadata.user_name === username;

  return (
    <div className="flex gap-2.5 max-sm:flex-col">
      {isUserProfile ? (
        <Button asChild variant={"outline"}>
          <Link href="/setting">Edit Profile</Link>
        </Button>
      ) : (
        <>
          {hireEmail && (
            <Modal
              title={`Contact ${username} here.`}
              buttonChildren="Get in touch"
              buttonVariant={"outline"}
              aria-label="get in touch"
            >
              <SendEmail hireEmail={hireEmail} />
            </Modal>
          )}
          <FollowButton
            currentUser={user.id}
            profileId={profileId}
            isFollowing={data?.length}
          />
        </>
      )}
    </div>
  );
}
