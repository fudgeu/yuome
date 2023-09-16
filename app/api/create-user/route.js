import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const phone_number = searchParams.get('phone_number');
 
  try {
    if (!name || !phone_number) throw new Error('Balance and phone number required');
    await sql`INSERT INTO Users (name, phone_number) VALUES (${name}, ${phone_number});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const users = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
}