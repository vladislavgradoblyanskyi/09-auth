import type {Note,NoteFormValues} from '../../types/note.js'
import { User } from "@/types/user";
import { nextServer } from './api'

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(page: number=1, search: string="",tag? : string) {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      tag
    },
  });

  return response.data;
}

export const createNote = async (note: NoteFormValues) => {
  const res = await nextServer.post<Note>("/notes", note);
  return res.data;
};

export async function deleteNote(id: string) {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export const fetchNoteById = async (id:string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};



export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};


export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type EditProfileRequest = {
  username: string;
};
export async function editProfile(data: EditProfileRequest) {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
}
