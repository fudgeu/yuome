import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  
  try {

    const data  = await request.json()
  

    const transaction = await sql`INSERT INTO TRANSACTIONS (id, type, amount, r_date) VALUES (${data.id}, ${data.type}, ${data.amount}, ${data.r_date});`;

    const usertransaction = await sql`INSERT INTO USERTRANSACTIONS (pn_to, fk_id, pn_from, notes) VALUES (${data.pn_to}, ${data.id}, ${data.pn_from}, ${data.notes});`;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
 
  // const users = await sql`SELECT * FROM Users;`;
  // return NextResponse.json({ users }, { status: 200 });
}
