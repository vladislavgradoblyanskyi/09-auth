import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { User } from '@/types/user';
import type { Note } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};


export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function ServerfetchNotes(page: number=1, search: string="",tag? : string) {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      tag
    },
    headers:{
      Cookie: cookieStore.toString()
    }
  });

  return response.data;
}

export default async function ServerfetchNoteById (id:string) {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`,{
    headers:{Cookie: cookieStore.toString(),}
  });
  return res.data;
};


export async function SerevrdeleteNote(id: string) {
  const cookieStore = await cookies();
  const response = await nextServer.delete<Note>(`/notes/${id}`,{
    headers:{Cookie: cookieStore.toString(),}
  });
  return response.data;
}