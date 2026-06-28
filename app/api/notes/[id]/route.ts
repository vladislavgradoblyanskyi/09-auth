import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';


type Props = {
  params: Promise<{ id: string }>;
};


export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  try {
	  const { data } = await api(`/notes/${id}`);

    return NextResponse.json(data);

  } 
  catch (err) {
    return NextResponse.json(
      {
        err: (err as ApiError).response?.data?.error ?? (err as ApiError).message,
      },
      { status: (err as ApiError).status }
    )
  }
}