'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateTechStackArray } from '../../[profileId]/actions';
import { DialogClose } from '@/components/ui/dialog';

type AddTechStackType = {
  userId: string;
  tech_stack: string[] | null;
};

export default function AddTechStack({ userId, tech_stack }: AddTechStackType) {
  const [newItem, setNewItem] = useState('');
  const [techStack, setTechStack] = useState(tech_stack || []);
  const router = useRouter();

  const addTechBadge = () => {
    if (techStack) {
      setTechStack([...techStack, newItem]);
      setNewItem('');
    }
  };

  const deleteTechBadge = async (item?: string) => {
    if (techStack) {
      const newArray = techStack.filter((badge) => {
        if (badge !== item) {
          return badge;
        }
      });

      setTechStack(newArray);
    }
  };

  const saveTechStack = async () => {
    if (techStack) {
      const { error } = await updateTechStackArray(userId, techStack);

      if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.success('Tech stack has been updated!');
        setNewItem('');
        router.refresh();
      }
    }
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {techStack?.map((item, i) => {
          return (
            <div key={i} className="relative">
              <Badge className="capitalize">{item}</Badge>
              <Button
                type="button"
                variant={'secondary'}
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
      <div className="space-y-5">
        <Input
          type="text"
          value={newItem}
          onChange={({ target }) => setNewItem(target.value)}
        />
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={addTechBadge}>Add</Button>
            <Button onClick={saveTechStack} variant={'accent'}>
              Save
            </Button>
          </div>
          <DialogClose asChild>
            <Button variant={'secondary'}>Cancel</Button>
          </DialogClose>
        </div>
      </div>
    </section>
  );
}
