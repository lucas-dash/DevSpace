export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          bookmark_id: string;
          created_at: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          bookmark_id?: string;
          created_at?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          bookmark_id?: string;
          created_at?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      comments: {
        Row: {
          comment_id: string;
          content: string;
          created_at: string;
          parentCommentId: string | null;
          post_id: string;
          user_id: string;
        };
        Insert: {
          comment_id?: string;
          content: string;
          created_at?: string;
          parentCommentId?: string | null;
          post_id: string;
          user_id: string;
        };
        Update: {
          comment_id?: string;
          content?: string;
          created_at?: string;
          parentCommentId?: string | null;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_parentCommentId_fkey';
            columns: ['parentCommentId'];
            isOneToOne: false;
            referencedRelation: 'comments';
            referencedColumns: ['comment_id'];
          },
          {
            foreignKeyName: 'comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      follows: {
        Row: {
          created_at: string;
          follower_id: string;
          following_id: string;
        };
        Insert: {
          created_at?: string;
          follower_id: string;
          following_id: string;
        };
        Update: {
          created_at?: string;
          follower_id?: string;
          following_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'follows_follower_id_fkey';
            columns: ['follower_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'follows_following_id_fkey';
            columns: ['following_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          }
        ];
      };
      likes: {
        Row: {
          created_at: string;
          like_id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          like_id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          like_id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          }
        ];
      };
      posts: {
        Row: {
          content: string;
          created_at: string;
          created_by: string;
          id: string;
          private: boolean;
        };
        Insert: {
          content?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          private?: boolean;
        };
        Update: {
          content?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          private?: boolean;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          company: string | null;
          created_at: string;
          display_name: string;
          email: string;
          hire_email: string | null;
          id: string;
          social_link_one: string | null;
          social_link_three: string | null;
          social_link_two: string | null;
          tech_stack: string[] | null;
          url: string | null;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          company?: string | null;
          created_at?: string;
          display_name: string;
          email: string;
          hire_email?: string | null;
          id: string;
          social_link_one?: string | null;
          social_link_three?: string | null;
          social_link_two?: string | null;
          tech_stack?: string[] | null;
          url?: string | null;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          company?: string | null;
          created_at?: string;
          display_name?: string;
          email?: string;
          hire_email?: string | null;
          id?: string;
          social_link_one?: string | null;
          social_link_three?: string | null;
          social_link_two?: string | null;
          tech_stack?: string[] | null;
          url?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profile_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      reposts: {
        Row: {
          created_at: string;
          post_id: string;
          repost_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          post_id: string;
          repost_id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          post_id?: string;
          repost_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reposts_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reposts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
