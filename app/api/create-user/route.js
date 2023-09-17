import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  
  try {

    const data  = await request.json()
  
    const result = await sql`INSERT INTO Users (name, phone_number) VALUES (${data.name}, ${data.phone_number});`;

    if (data.pn_from.startsWith('+1')){
      data.pn_from = data.pn_from.substring(2,12)
    }

    // if (!name || !phone_number) throw new Error('Balance and phone number required');
    
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  // const users = await sql`SELECT * FROM Users;`;
  // return NextResponse.json({ users }, { status: 200 });
}