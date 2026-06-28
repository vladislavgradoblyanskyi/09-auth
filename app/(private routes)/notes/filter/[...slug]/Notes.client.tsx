"use client"
import css from './page.module.css';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Link from 'next/link';

interface Props {
  tag?: string;
}

export default function NotesClient({tag}:Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", search, page,tag],
    queryFn: () => fetchNotes(page, search,tag),
    placeholderData: (prev) => prev,
  });

  

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}

      {data && data.notes && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          setPage ={(newPage:number) => setPage(newPage)}
          totalPages={data.totalPages}
          page={page}
        />
      )}

    </div>
  );
}
