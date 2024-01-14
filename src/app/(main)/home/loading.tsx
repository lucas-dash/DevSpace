import { Loader2 } from 'lucide-react';

export default function Loading() {
  // todo skeleton
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 size={32} className="animate-spin" />
    </div>
  );
}
