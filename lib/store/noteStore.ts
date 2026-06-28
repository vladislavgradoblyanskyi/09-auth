import { create } from 'zustand';
import { NoteFormValues } from '../../types/note';
import { persist } from 'zustand/middleware';

const initialDraft: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};
type NoteDraftStore = {
  draft: NoteFormValues;
  setDraft: (note: NoteFormValues) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}),
  {
    name: 'note-draft',
    partialize: (state) => ({ draft: state.draft }),
  })
);