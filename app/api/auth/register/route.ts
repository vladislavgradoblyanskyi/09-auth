import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { parseSetCookie } from 'cookie';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
	  const res = await api.post('auth/register', body);
	
	  const cookieStore = await cookies();

	  const setCookie = res.headers['set-cookie'];
	
	  if (setCookie) {
	    const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
			
	    for (const cookieStr of cookieArray) {
	      const parsed = parseSetCookie(cookieStr);
	      
	      if (parsed.value) cookieStore.set(parsed.name, parsed.value, parsed);
	    }
	    
	    return NextResponse.json(res.data);
	  }
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  } catch (err) {
    return NextResponse.json(
      {
        err: (err as ApiError).response?.data?.error ?? (err as ApiError).message,
      },
      { status: (err as ApiError).status }
    )
  }
}