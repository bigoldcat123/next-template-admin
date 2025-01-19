'use client'
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchC() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get('bookName') || '')
    useEffect(() => {
        // router.replace('?')
        const s = new URLSearchParams(searchParams.toString())
        if (query) {
            s.set('bookName', query)
            setQuery(query)
        } else {
            s.delete('bookName')
        }
        // s.set('page', '1')
        router.replace(`?${s.toString()}`)
    }, [query])
    return (
        <div className=" border-2 border-red-200 rounded-md w-56 relative">
            <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder='book name' className=' py-1 pl-8 focus:outline-none w-full' />
            <Search className=" text-red-400 absolute w-4 h-4 top-2 left-2 pointer-events-none" />
        </div>
    );
}