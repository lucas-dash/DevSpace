import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { ReactNode } from 'react';

type DrawerContentProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function DrawerContents({
  children,
  title,
  description,
}: DrawerContentProps) {
  return (
    <DrawerContent className="h-[90dvh] sm:h-[85dvh]">
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
