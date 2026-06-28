import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../api';
import { cookies } from 'next/headers';


export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const search = request.nextUrl.searchParams.get('search') ?? ''
  const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
  const tag = request.nextUrl.searchParams.get('tag');

  const readyTag = tag==='all' ? '' : tag
  try {
    const { data } = await api('/notes', {
        params: {
        search,
        page,
        perPage: 12,
        tag:readyTag,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    )
  }
}


export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookieStore = await cookies();
  try {
	  const { data } = await api.post('/notes', body,{
      headers:{Cookie: cookieStore.toString(),'Content-Type': 'application/json',}
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