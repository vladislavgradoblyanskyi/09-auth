import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';


type Props = {
  params: Promise<{ id: string }>;
};


export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  try {
	  const { data } = await api.get(`/notes/${id}`,{
      headers:{Cookie: cookieStore.toString(),}
    });

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


export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  try {
	  const { data } = await api.delete(`/notes/${id}`,{
      headers:{Cookie: cookieStore.toString(),}
    });

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