import prisma from '@/prisma/index'

export const getUsers = async () => {
    try{
        const users = await prisma.user.findMany({})
        return users

    } catch(err) {
        return {err}
    }
}