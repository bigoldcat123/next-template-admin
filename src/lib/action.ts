'use server'

import { z } from "zod"
import db from "./db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import cloudinary from "./cloudinaryClient"

export async function getBookTypes() {
    const genres = await db.genre.findMany()
    return genres
}

const fileSchema = z.custom<File>((val) => {
    return (val instanceof File);
}, {
    message: "Expected a File object"
});
const bookSchema = z.object({
    picture: fileSchema.optional(),  // 使用自定义的 File 验证
    title: z.string(),
    author: z.string(),
    description: z.string(),
    types: z.string(),
    id:z.string().optional()
});
export async function createBook(formdata: FormData) {
    const dara = Object.fromEntries(formdata)
    const s = bookSchema.parse(dara)
    const fileURL = await uploadFile(s.picture)
    await db.book.create({
        data: {
            author: s.author,
            description: s.description,
            image: fileURL,
            title: s.title,
            genres: {
                connect: s.types.split('-').map((id) => ({ id }))
            }
        }
    })
    revalidatePath('/dashboard/book')
    redirect('/dashboard/book')
}
type QueryBook = {
    bookName?: string
}
const PAGE_SIZE = 10
export async function getBooksByPage(page: number, query: QueryBook) {
    //sleep 1s
    await new Promise((resolve) => setTimeout(resolve, 500))
    const books = await db.book.findMany({
        where: {
            title: {
                contains: query.bookName
            }
        },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE
    })
    return books
}
export async function getPages(query: QueryBook) {
    const count = await db.book.count({
        where: {
            title: {
                contains: query.bookName
            }
        }
    })
    return Math.ceil(count / PAGE_SIZE)
}

export async function geyBookById(id:string) {
    const book = await db.book.findUnique({
        where: {
            id
        },
        include:{
            genres:true
        }
    })
    return book!
}


async function uploadFile(picture: File | undefined) {
    if (!picture) return ''
    const public_id = 'bookStore' + Date.now().toString()
    const upload_stream = cloudinary.uploader.upload_stream({
        public_id
    })
    
    const reader = picture.stream().getReader()
    while (true) {
        const { done, value } = await reader.read()
        if (done) {
            upload_stream.end()
            break
        }
        upload_stream.write(value)
    }
    return cloudinary.url(public_id)
}

export async function updateBook(formdata:FormData) {
    const data = Object.fromEntries(formdata)
    const book =bookSchema.parse(data)
    
    await db.book.update({
        where:{
            id:book.id!
        },
        data: {
            author: book.author,
            description: book.description,
            title: book.title,
            genres:{
                set: book.types.split('-').map((id) => ({ id }))
            }
        }
    })
    revalidatePath('/dashboard/book')
    redirect('/dashboard/book')
}

export async function deleteBook(id:string) {
    await db.book.delete({
        where: {
            id
        },
        // include:{

        // }
    })
    revalidatePath('/dashboard/book')
}