"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ProfileSchema } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/Modal";
import { Link as Elink, Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { checkNewUsername } from "@/app/auth/actions";
import { updateProfileById } from "../../[profileId]/actions";
import AddTechStack from "./add-tech-stack";

type ProfileSettingFormType = {
  userId: string;
  profile: Profile;
};

export default function ProfileSettingForm({
  userId,
  profile: {
    bio,
    username,
    display_name,
    avatar_url,
    social_link_one,
    social_link_two,
    social_link_three,
    company,
    hire_email,
    url,
    tech_stack,
  },
}: ProfileSettingFormType) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: username || "",
      name: display_name || "",
      avatar_url: avatar_url || "",
      bio: bio || "",
      company: company || "",
      url: url || "",
      hireEmail: hire_email || "",
      link1: social_link_one || "",
      link2: social_link_two || "",
      link3: social_link_three || "",
    },
  });

  function onSubmit(data: z.infer<typeof ProfileSchema>) {
    startTransition(async () => {
      const prevUsername = username;

      const response = await checkNewUsername(data.username);

      if (response || prevUsername === data.username) {
        const { error } = await updateProfileById(userId, data);
        if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.success("The profile has been edited!");
          router.refresh();
        }
      } else if (!response) {
        toast.warning("Username already exists!");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex-1 max-sm:order-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="sm:w-max">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="johndoe"
                  maxLength={20}
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="sm:w-max">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John Doe"
                  maxLength={20}
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none rounded-lg"
                  maxLength={160}
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="w-max">
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="@Netflix"
                  maxLength={20}
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hireEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hire Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="shark@email.com"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium">Social Links</h4>
          <FormField
            control={form.control}
            name="link1"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <Elink className="mr-1.5" size={20} />
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link2"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <Elink className="mr-1.5" size={20} />
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link3"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <Elink className="mr-1.5" size={20} />
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="pt-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">Tech Stack</h4>
              <Modal
                title="Add tech stack to your profile"
                buttonChildren={<PlusCircle size={20} />}
                buttonSize={"icon"}
                className="hover:scale-110 transition-all rounded-full h-5 w-5"
                aria-label="add tech stack"
              >
                <AddTechStack userId={userId} tech_stack={tech_stack} />
              </Modal>
            </div>

            <article className="flex items-center gap-1 mt-3 flex-wrap">
              {tech_stack?.map((item, i) => {
                return (
                  <Badge className="capitalize" key={i}>
                    {item}
                  </Badge>
                );
              })}
            </article>
          </section>
        </div>

        <Button
          type="submit"
          variant={"accent"}
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin mr-1" />}
          Save
        </Button>
      </form>
    </Form>
  );
}
