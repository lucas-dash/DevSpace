import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HTMLAttributes, ReactNode } from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

type CustomDrawerProps = {
  title: string;
  description?: string;
  buttonChildren: string | ReactNode;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export default function CustomDrawer({
  title,
  description,
  buttonChildren,
  buttonVariant,
  buttonSize,
  children,
  className,
  ...props
}: CustomDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={buttonVariant}
          className={cn(className, "")}
          size={buttonSize}
          {...props}
        >
          {buttonChildren}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90dvh] sm:h-[75dvh]">
        <div className="mx-auto w-full  max-w-xl">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          {children}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
