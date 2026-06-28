"use client";

import css from "./NoteForm.module.css";
// import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { NoteTag } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// const validationSchema = Yup.object({
//  title: Yup.string().min(3).max(50).required(),
//  content: Yup.string().max(500),
//  tag: Yup.string()
//    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//    .required(),
//});


type EvtType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
export default function NoteForm() {

  const router = useRouter();

  const handleCancel = () => {
    router.push('/notes/filter/all');
  };

  const {draft,setDraft,clearDraft} = useNoteDraftStore();

   const handleChange = (event: EvtType) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });
  const handleSubmit = (formData: FormData) => {
     mutation.mutate({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    });
  }
  return (

        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label>Title</label>
            <input type="text" name="title" className={css.input}  onChange={handleChange} defaultValue={draft?.title}/>
          </div>

          <div className={css.formGroup}>
            <label>Content</label>
            <textarea name="content" className={css.textarea}  onChange={handleChange} defaultValue={draft?.content}/>
          </div>

          <div className={css.formGroup}>
            <label>Tag</label>
            <select name="tag" className={css.select} onChange={handleChange} defaultValue={draft?.tag}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div className={css.actions}>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={mutation.isPending}>
              Create note
            </button>
          </div>
        </form>
  );
}