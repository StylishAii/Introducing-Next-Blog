"use server"
import {cookies} from 'next/headers'
//@ts-ignore
async function createJwtCookie(data:any){
    cookies().set("nxt-auth-jwt", data, {secure:true})
}