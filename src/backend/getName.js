import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Names from '@/models/nameModel';

export async function GET(req) {
try{
    await connect();
    const names = ['Alex', 'James', 'Uday'];
    return NextResponse.json({ names });
}
catch(error){
    console.log(error);
}
}
