"use client";
import Modal from "@/components/Modal/Modal";
import {fetchNoteById} from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./modal.module.css"
interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();
  const {data: note,isLoading,isError,} = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  const handleBack = () => router.back();

  return (
    <Modal onClose={handleBack}>
      {isLoading && <p>Loading note details...</p>}
      {isError && <p>Failed to load note. Please try again later.</p>}
      {note && (
        <>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p>{note.createdAt}</p>
          <button onClick={handleBack} className={css.button}>Close</button>
        </>
      )}
    </Modal>
  );
}