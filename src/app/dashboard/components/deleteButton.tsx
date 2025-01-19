'use client'
import { deleteBook } from "@/lib/action";
import { Trash2 } from "lucide-react";

export default function DeleteButton({id}:{id:string}) {
    return (
        <>
            <button onClick={() => { deleteBook(id) }} className="  hover:bg-red-100 p-1 rounded-md" ><Trash2 className=" size-5 text-red-500" /></button>
        </>
    );
}