'use server'

import { z } from "zod"
import db from "./db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getBookTypes() {
    const genres = await db.genre.findMany()
    return genres
}

const fileSchema = z.custom<File>((val) => {
    return val instanceof File;
}, {
    message: "Expected a File object"
});
const bookSchema = z.object({
    picture: fileSchema,  // 使用自定义的 File 验证
    title: z.string(),
    author: z.string(),
    description: z.string(),
    types: z.string(),
});
export async function createBook(formdata: FormData) {
    const dara = Object.fromEntries(formdata)
    console.log(dara);
    const s = bookSchema.parse(dara)
    console.log(s);
    await db.book.create({
        data: {
            author: s.author,
            description: s.description,
            image: 's.picture',
            title: s.title,
            genres: {
                connect: s.types.split('-').map((id) => ({ id }))
            }
        }
    })
    revalidatePath('/dashboard/book')
    redirect('/dashboard/book')
}