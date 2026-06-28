import css from './CreateNote.module.css'
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create note",
  description: "You can create a note on this page,all your drafts are being saved,so you can come back and finish later!",
  openGraph:{
    title: "Create note",
    description: "You can create a note on this page,all your drafts are being saved,so you can come back and finish later!",
    url: `${process.env.base_url}/create`,
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt : "notehub img",
    }]
  }
};


export default function CreateNote(){
    return(
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
	            <NoteForm/>
            </div>
    </main>
)
}