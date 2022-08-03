import { NextRequest, NextResponse } from "next/server";
import {nanoid} from 'nanoid';

export function middleware(req:NextRequest){
    if(req.cookies.get('poll-token')){
        return;
    }
    const token = nanoid();
    const res = NextResponse.next();
    res.cookies.set('poll-token',token,{sameSite:'strict'});
    return res;
}

export const config ={
    matcher:['/question/:path*','/user']
}