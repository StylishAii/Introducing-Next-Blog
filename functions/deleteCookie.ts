"use server"
import {cookies} from 'next/headers'
//@ts-ignore
async function deleteJwtCookie(data:any){
    cookies().delete("nxt-auth-jwt")
}