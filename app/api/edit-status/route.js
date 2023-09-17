import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  const data = await request.json()
 
  try {
    
    const res  = await sql`UPDATE transactions SET status=${data.status} WHERE id=${data.id}`;

    return NextResponse.json( { res } , { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }

  
}