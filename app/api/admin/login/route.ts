import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, setAuthCookie } from '@/lib/auth';
export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (verifyCredentials(username, password)) {
      await setAuthCookie();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
