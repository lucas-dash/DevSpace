'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateTechStackArray } from '../../[profileId]/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type AddTechStackType = {
  userId: string;
  tech_stack: string[] | null;
};

export default function AddTechStack({ userId, tech_stack }: AddTechStackType) {
  const [newItem, setNewItem] = useState('');
  const router = useRouter();

  if (tech_stack?.length === 0 || !tech_stack) {
    tech_stack = [];
  }

  const addTechStack = async () => {
    if (newItem !== '') {
      if (tech_stack) {
        const updatedArray = [...tech_stack, newItem];

        const { error } = await updateTechStackArray(userId, updatedArray);

        if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.success('Tech stack has been updated!');
          setNewItem('');
          router.refresh();
        }
      }
    }
  };

  const deleteTechBadge = async (item?: string) => {
    if (tech_stack) {
      const updatedTechStack = tech_stack?.filter((tech) => {
        if (item !== tech) {
          return tech;
        }
      });

      const { error } = await updateTechStackArray(userId, updatedTechStack);

      if (error?.message) {
        toast.error(error?.message);
      } else {
        router.refresh();
        toast.success('Tech stack has been updated!');
      }
    }
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {tech_stack?.map((item, i) => {
          return (
            <div key={i} className="relative">
              <Badge className="capitalize">{item}</Badge>
              <Button
                type="button"
                variant={'outline'}
                size={'icon'}
                className="h-4 w-4 absolute -top-0.5 -right-2 z-40"
                onClick={() => deleteTechBadge(item)}
              >
                <X size={18} />
              </Button>
            </div>
          );
        })}
      </div>
      <div className="space-y-3">
        <Input
          type="text"
          value={newItem}
          onChange={({ target }) => setNewItem(target.value)}
        />
        <Button onClick={addTechStack}>Add</Button>
      </div>
    </section>
  );
}
