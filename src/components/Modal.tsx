import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from 'react';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ModalProps = {
  children: ReactNode;
  title: string;
  description?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Modal({
  title,
  description,
  children,
  className,
  ...props
}: ModalProps) {
  return (
    <DialogContent className={cn('', className)} {...props}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  );
}
