'use client'
import { Label } from "@/components/ui/label";
import BreadC from "../../components/breadC";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useId, useState } from "react";
import { createBook, getBookTypes } from "@/lib/action";
import { Genre } from "@prisma/client";
import { Button } from "@/components/ui/button";

// id          String    @id @default(cuid())
//   title       String
//   author      String
//   description String
//   image       String
//   genres      Genre[]
export default function CreatePage() {
    return (
        <>
            <BreadC breadCrumbs={[{ name: "book", url: "/dashboard/book" }, { name: "create", url: "/dashboard/book/create" }]} />

            <form action={createBook} className=" p-8 bg-red-50 rounded-md flex flex-col space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input required accept="image/*" name="picture" id="picture" type="file" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="bn">Book Name</Label>
                    <Input required type="text" name="title" id="bn" placeholder="Book Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Author">Author</Label>
                    <Input required type="text" name="author" id="Author" placeholder="Author Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Description">Description</Label>
                    <Textarea required name="description" id="Description" placeholder="Description" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <TypeInput />
                </div>
                <div>
                    <Button>Create</Button>
                </div>
            </form>
        </>
    );
}
function TypeInput() {
    const [focus, setFocus] = useState(false);
    const [genres, setGenres] = useState<Genre[] | null>(null);
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<Genre[]>([])
    const id = useId()
    useEffect(() => {
        getBookTypes().then(res => {
            setGenres(res)
        })
        function clientClick(e: MouseEvent) {
            const effectArea = document.getElementById(id) as HTMLDivElement
            if (!effectArea.contains(e.target as Node)) {
                setFocus(false)
            }
        }
        window.addEventListener('click', clientClick)
        return () => {
            window.removeEventListener('click', clientClick)
        }
    }, [])
    function handleChose(genre: Genre) {
        setSelected([...selected, genre])
        setQuery('')
    }
    return (
        <>
            <Label htmlFor="Description">Types</Label>
            <div id={id} className=" relative border rounded-sm shadow-sm p-2">
                <input onFocus={() => setFocus(true)} onChange={(e) => setQuery(e.target.value)} value={query} type="text" name="" id="" className="bg-transparent outline-none w-full" />
                {
                    focus &&
                    <div className=" max-h-52 overflow-y-scroll">
                        {genres && genres.filter(x => x.name.includes(query) && !selected.map(x => x.id).includes(x.id)).map(x => (
                            <div key={x.id} onClick={() => handleChose(x)} className=" bg-red-100 hover:bg-red-200 rounded-md p-1 mb-1 cursor-pointer">
                                {x.name}
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className=" flex flex-wrap space-x-2 gap-y-2">
                {
                    selected.map(x => (
                        <div key={x.id} className=" bg-red-100 rounded-md p-2 relative">
                            {x.name}
                            <div onClick={() => setSelected(selected.filter(s => s.id !== x.id))} className=" absolute bg-red-600 rounded-full size-3 text-[0.6rem] text-center cursor-pointer -top-1 -right-1">X</div>
                        </div>
                    ))
                }
            </div>
            <Input value={selected.map(x => x.id).join("-")} type="hidden" name="types" />
        </>
    )
}