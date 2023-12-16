import type { Database } from '@/lib/database.types';

declare global {
  type Post = Database['public']['Tables']['posts']['Row'];
}
