import { fetchNotes } from "@/lib/api/clientApi";
import {dehydrate,HydrationBoundary,QueryClient} from "@tanstack/react-query";
import { Metadata } from "next";
import NotesClient from "./Notes.client";

type Props = {
    params:Promise<{slug:string[]}>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const {slug} = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];
    const validatedTag = tag || 'All';

    return {
    title: `filter by: ${validatedTag}`,
    description: `Notes filtered by tag: ${validatedTag}`,
    openGraph:{
    title: `filter by: ${validatedTag}`,
    description: `Notes filtered by tag: ${validatedTag}`,
    url: `${process.env.base_url}/notes/filter/${validatedTag}`,
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt : "notehub img",
    }]
  }
  }
}
export default async function NotesByTag ({params}:Props){
    const {slug} = await params;
    const queryClient = new QueryClient();
    const tag = slug[0] === 'all' ? undefined : slug[0];
    const normalizedTag = tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : undefined;


    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", normalizedTag],
        queryFn: () => fetchNotes(1, "", normalizedTag)
    });
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={normalizedTag}/>
        </HydrationBoundary>
    )
}