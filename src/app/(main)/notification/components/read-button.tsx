"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { readNotification } from "../actions/notification";

type ReadButtonType = {
  notifyId: string;
  is_read: boolean;
};

export default function ReadButton({ notifyId, is_read }: ReadButtonType) {
  const [isRead, setIsRead] = useState(is_read);
  const [isPending, startTransition] = useTransition();

  if (isRead) {
    return;
  }

  const handleReadNotification = () => {
    startTransition(async () => {
      const { error } = await readNotification(notifyId);
      if (!error?.message) {
        setIsRead(true);
      }

      if (error?.message) {
        setIsRead(false);
        toast.error(error?.message);
      }
    });
  };

  return (
    <div className="absolute -top-2 -right-2">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full"
        onClick={handleReadNotification}
        disabled={isPending}
        aria-disabled={isPending}
      >
        {isPending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <CheckCircle size={20} />
        )}
      </Button>
    </div>
  );
}
