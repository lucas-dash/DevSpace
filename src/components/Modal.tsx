import { HTMLAttributes, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

type ModalProps = {
  children: ReactNode;
  title: string;
  description?: string;
  buttonChildren: string | ReactNode;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
} & HTMLAttributes<HTMLButtonElement>;

export default function Modal({
  children,
  title,
  description,
  buttonChildren,
  buttonVariant = "default",
  buttonSize = "default",
  className,
  ...props
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={cn(className, "")}
          {...props}
        >
          {buttonChildren}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
