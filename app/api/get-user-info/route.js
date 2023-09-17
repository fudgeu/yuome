import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const phone_number = searchParams.get('phone_number');
 
  try {
    console.log(`SELECT * FROM transactions as t, usertransactions as u WHERE t.id=u.fk_id and (u.pn_to=\'${phone_number}\' or u.pn_from=\'${phone_number}\') ORDER BY t.r_date`)
    const res  = await sql`SELECT * FROM transactions as t, usertransactions as u WHERE t.id=u.fk_id and (u.pn_to=\'${phone_number}\' or u.pn_from=\'${phone_number}\') ORDER BY t.r_date`;
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  
}