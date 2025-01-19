'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Genre } from "@prisma/client";
import { useEffect, useId, useState } from "react";

export default function TypeInput({defaultValue ,genres}:{defaultValue:Genre[],genres:Genre[]}) {
    const [focus, setFocus] = useState(false);
    // const [genres, setGenres] = useState<Genre[] | null>(null);
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<Genre[]>(defaultValue)
    const id = useId()
    useEffect(() => {
        // getBookTypes().then(res => {
        //     setGenres(res)
        // })
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