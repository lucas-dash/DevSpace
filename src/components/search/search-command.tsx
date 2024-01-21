'use client';

import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Bookmark, Layout, Search, Settings2 } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import { Input } from '../ui/input';
import SearchingPost from './searching-post';

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Post[] | null>(null);
  const supabase = createSupabaseBrowserClient();

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query === '') {
      setPosts(null);
    }
  }, [posts, query]);

  useEffect(() => {
    const getPosts = async (searchQuery: string) => {
      if (searchQuery !== '') {
        const { data, error } = await supabase
          .from('posts')
          .select()
          .ilike('content', `%${searchQuery}%`);
        if (error) {
          setPosts(null);
        } else {
          setPosts(data);
        }
      }
    };
    getPosts(query);
  }, [supabase, query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant={'ghost'}
        size={'sm'}
        className="text-sm text-muted-foreground flex items-center gap-1 px-1 max-sm:rounded-full"
        onClick={() => setOpen(true)}
      >
        <Search className="sm:mr-1" />
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 max-sm:hidden border-slate-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Type for search posts..."
            type="text"
            className={
              'my-2 flex w-full dark:bg-zinc-950 py-3 text-sm outline-none border-none focus-visible:ring-0 focus-visible:ring-none dark:focus-visible:ring-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400'
            }
            value={query}
            onChange={(e) => handleSearchInput(e)}
          />
        </div>

        <CommandList>
          <CommandGroup heading="Searching">
            {posts?.length === 0 ? (
              <p className="py-2 text-center text-sm w-full">No posts found.</p>
            ) : (
              posts?.map((post) => {
                return (
                  <CommandItem key={post.id}>
                    <SearchingPost post={post} setOpen={setOpen} />
                  </CommandItem>
                );
              })
            )}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Link
                href={'/home'}
                className="flex items-center w-full"
                onClick={() => setOpen(false)}
              >
                <Layout className="mr-2 h-4 w-4" />
                <span>Home</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Link
                href={'/setting'}
                className="flex items-center w-full"
                onClick={() => setOpen(false)}
              >
                <Settings2 className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Link
                href={'/bookmarks'}
                className="flex items-center w-full"
                onClick={() => setOpen(false)}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Bookmarks</span>
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
