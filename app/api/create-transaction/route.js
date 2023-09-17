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

    data.pn_to = data.pn_to.split(" ").join("")

    if (data.pn_from.startsWith('+1')){
      data.pn_from = data.pn_from.substring(2,12)
    }


    console.log(`INSERT INTO TRANSACTIONS (id, type, amount, r_date) VALUES (${id}, ${data.type}, ${data.amount}, \'${year}-${month}-${day}\');`)
    // console.log(`INSERT INTO TRANSACTIONS (id, type, amount, r_date) VALUES (${id}, ${data.type}, ${data.amount}, \'${date}\');`)
    const transaction = await sql`INSERT INTO TRANSACTIONS (id, type, amount, r_date, status) VALUES (${id}, ${data.type}, ${data.amount}, ${fulldate}, true );`;
    console.log(`INSERT INTO USERTRANSACTIONS (pn_to, fk_id, pn_from, notes) VALUES (${data.pn_to}, ${id}, ${data.pn_from}, ${data.notes});`)
    const usertransaction = await sql`INSERT INTO USERTRANSACTIONS (pn_to, fk_id, pn_from, notes) VALUES (${data.pn_to}, ${id}, ${data.pn_from}, ${data.notes});`;

    const name = await sql`SELECT NAME FROM USERS WHERE USERS.PHONE_NUMBER=${data.pn_from}`;

   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = require('twilio')(accountSid, authToken);

   if (data.type.localeCompare("req") == 0){

     client.messages
     .create({
       body: `${name.rows[0].name} has requested \$${data.amount}. Visit yuome for more info!`,
       from: '+18447710785',
       to: data.pn_to
      })
      .then(message => console.log(message.sid));
  } 


    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
 
  // const users = await sql`SELECT * FROM Users;`;
  // return NextResponse.json({ users }, { status: 200 });
}
