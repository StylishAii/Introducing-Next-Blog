"use server"
import {cookies} from 'next/headers'

async function deleteJwtCookie(data){
    cookies().delete("nxt-auth-jwt")
}