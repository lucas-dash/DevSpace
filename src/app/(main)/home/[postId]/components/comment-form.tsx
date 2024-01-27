"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CommentSchema } from "@/lib/validations";
import { createComment, replyToComment } from "@/lib/actions/comments";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { sendNotification } from "@/app/(main)/notification/actions/notification";
import createSupabaseBrowserClient from "@/lib/supabase/client";

type CommentFormType = {
  createdBy: string;
  postId?: string;
  commentId?: string;
  modal?: boolean;
};

export default function CommentForm({
  createdBy,
  postId,
  commentId,
  modal,
}: CommentFormType) {
  const supabase = createSupabaseBrowserClient();
  const [isPending, startTransition] = useTransition();
  const [userId, setUserId] = useState<string | undefined>();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getUser();
  }, [supabase]);

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof CommentSchema>) {
    startTransition(async () => {
      if (commentId && postId) {
        const { error } = await replyToComment(data.content, commentId, path);

        if (!error?.message) {
          toast.success("Send!");
          // notification
          if (userId !== createdBy) {
            const { error: notifyError } = await sendNotification(
              createdBy,
              "replyComment",
              postId,
            );
            if (notifyError?.message) {
              toast.error(notifyError?.message);
            }
          }

          form.reset();
          if (modal) {
            router.back();
          }
        } else {
          toast.error(error?.message);
        }
      }

      if (postId && !commentId) {
        const { error } = await createComment(data.content, postId, path);

        if (!error?.message) {
          toast.success("Send!");

          // notification
          if (userId !== createdBy) {
            const { error: notifyError } = await sendNotification(
              createdBy,
              "comments",
              postId,
            );
            if (notifyError?.message) {
              toast.error(notifyError?.message);
            }
          }

          form.reset();
        } else {
          toast.error(error?.message);
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full flex gap-2.5"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Post your reply."
                  className="resize-none rounded-lg"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-2xl"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin mr-1" />}
          Reply
        </Button>
      </form>
    </Form>
  );
}
