import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', { month: 'long' }).substring(0,3);
  }
  
  try {

    const data  = await request.json()
    const id = Math.floor(Math.random()*1000000)

    const date = new Date();
    let day = date.getDate();
    let month = getMonthName(date.getMonth() + 1);
    let year = date.getFullYear();
    let fulldate = `${year}-${month}-${day}`;


    console.log(`INSERT INTO TRANSACTIONS (id, type, amount, r_date) VALUES (${id}, ${data.type}, ${data.amount}, \'${year}-${month}-${day}\');`)
    // console.log(`INSERT INTO TRANSACTIONS (id, type, amount, r_date) VALUES (${id}, ${data.type}, ${data.amount}, \'${date}\');`)
    const transaction = await sql`INSERT INTO TRANSACTIONS (id, type, amount, r_date) VALUES (${id}, ${data.type}, ${data.amount}, ${fulldate} );`;
    console.log(`INSERT INTO USERTRANSACTIONS (pn_to, fk_id, pn_from, notes) VALUES (${data.pn_to}, ${id}, ${data.pn_from}, ${data.notes});`)
    const usertransaction = await sql`INSERT INTO USERTRANSACTIONS (pn_to, fk_id, pn_from, notes) VALUES (${data.pn_to}, ${id}, ${data.pn_from}, ${data.notes});`;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  // const users = await sql`SELECT * FROM Users;`;
  // return NextResponse.json({ users }, { status: 200 });
}
