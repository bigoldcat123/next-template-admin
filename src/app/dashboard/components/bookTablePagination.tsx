'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagnination({totalPages}:{totalPages:number}) {
    const searchParams = useSearchParams()
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1)
    const router = useRouter()
    const handleClick = (page:number) => {
        const s = new URLSearchParams(searchParams.toString())
        s.set('page', page.toString())
        setCurrentPage(page)
        router.push('?' + s.toString())
    }
  return (
    <>
      <div className=" flex justify-center mt-4 gap-x-2">
        {
            Array.from({length:totalPages}).map((_,index) => (
                <div onClick={() => handleClick(index + 1)} key={index} className={cn("cursor-pointer rounded-sm bg-red-100 size-6 text-center hover:bg-red-200",{
                    'bg-red-200': currentPage == (index + 1).toString()
                })}>
                    {index + 1}
                </div>
            ))
        }
      </div>
    </>
  );
}