import type { Database } from '@/lib/database.types';

declare global {
  type Post = Database['public']['Tables']['posts']['Row'];
  type Profile = Database['public']['Tables']['profile']['Row'];
  type Following = Database['public']['Tables']['follows']['Row'];
  type Likes = Database['public']['Tables']['likes']['Row'];
  type Bookmarks = Database['public']['Tables']['bookmarks']['Row'];
  type Reposts = Database['public']['Tables']['reposts']['Row'];
  type Comments = Database['public']['Tables']['comments']['Row'];
  type Notify = Database['public']['Tables']['notification']['Row'];
}
