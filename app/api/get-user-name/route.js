import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request) {


  const data = await request.json()
 
  try {
    
    if (data.phone_number.startsWith('+1')){
      data.phone_number = data.phone_number.substring(2,12)
    }

    console.log(`SELECT name FROM users where users.phone_number =${data.phone_number}`)
    const res  = await sql`SELECT name FROM users where users.phone_number=${data.phone_number}`;
    return NextResponse.json(  res.rows , { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }

  
}