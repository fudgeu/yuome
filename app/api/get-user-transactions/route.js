import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  // const { searchParams } = new URL(request.url);
  // const phone_number = searchParams.get('phone_number');

  const data = await request.json()
 
  try {
    
    if (data.phone_number.startsWith('+1')){
      data.phone_number = data.phone_number.substring(2,12)
    }

    console.log(`SELECT * FROM transactions as t, usertransactions as u WHERE t.id=u.fk_id and (u.pn_to=\'${data.phone_number}\' or u.pn_from=\'${data.phone_number}\') ORDER BY t.r_date`)
    const res  = await sql`SELECT * FROM transactions as t, usertransactions as u WHERE t.id=u.fk_id and (u.pn_to=${data.phone_number} or u.pn_from=${data.phone_number}) ORDER BY t.r_date`;
    return NextResponse.json( res.rows , { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }

  
}