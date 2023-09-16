import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const phone_number = searchParams.get('phone_number');
 
  try {
    if (!phone_number) throw new Error('Phone number required');
    res = await sql`SELECT * from`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ users }, { status: 200 });
}