import { readDrafts } from '@/app/(main)/home/actions';
import Draft from './draft';
import EmptyState from '../empty-state';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Drafts({ userId }: { userId: string }) {
  const { data: drafts } = await readDrafts(userId);

  return (
    <ScrollArea className="h-[50%] min-h-[370px]">
      <section className="flex flex-col gap-3 max-sm:p-3 sm:py-1.5 sm:px-3">
        {drafts?.length === 0 || drafts === undefined ? (
          <EmptyState title="You have no drafts." className="text-base" image />
        ) : (
          drafts?.map((draft) => <Draft key={draft.id} {...draft} />)
        )}
      </section>
    </ScrollArea>
  );
}
