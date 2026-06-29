
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { serverFetchNoteById } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";


export default async function NotePreview({params}: {params: Promise<{ id: string }>}){

  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["note", id],
     queryFn: () => serverFetchNoteById(id),
 });
  return ( 
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id}/>
    </HydrationBoundary> ); 
     }