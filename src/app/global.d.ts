import type { Database } from '@/lib/database.types';

declare global {
  type Post = Database['public']['Tables']['posts']['Row'];
  type Profile = Database['public']['Tables']['profile']['Row'];
}
