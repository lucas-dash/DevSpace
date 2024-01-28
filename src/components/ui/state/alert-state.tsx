"use client";

import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../button";

type AlertStateProps = {
  errorMessage?: string;
};
export default function AlertState({ errorMessage }: AlertStateProps) {
  const router = useRouter();
  if (errorMessage) {
    toast.error(errorMessage);
  }

  const reload = () => {
    router.push("/");
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="rounded-full"
      onClick={reload}
    >
      <AlertTriangle />
    </Button>
  );
}
