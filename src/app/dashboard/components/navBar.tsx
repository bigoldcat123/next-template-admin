'use client'
import { cn } from '@/lib/utils'
import { ActivitySquareIcon, BookCopy } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menus = [
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: ActivitySquareIcon
    },
    {
        name: "Book",
        url: "/dashboard/book?page=1",
        icon: BookCopy
    }
]
export default function NavBar() {
    const pathname = usePathname()
    return (
        <>
            <div className="flex flex-col md:h-full md:w-52 w-full h-32 p-2">
                <div className=" w-full h-32 bg-red-100 rounded-md">binner</div>
                <div className=' flex flex-row md:flex-col flex-grow mt-2 space-x-2 md:space-x-0'>
                    {
                        menus.map(menu =>
                            <Link className={cn('hover:bg-red-200 h-8 bg-red-100 rounded-md mb-2 flex-grow md:flex-grow-0 flex flex-row items-center justify-center md:justify-normal space-x-2',{
                                'bg-red-200': pathname === menu.url
                            })} key={menu.url} href={menu.url}>
                                <menu.icon />
                                <span className=' md:block hidden'> {menu.name}</span>
                            </Link>
                        )
                    }
                    <div className=' hidden md:flex-1 md:block'></div>

                    <div className=' h-8 bg-red-100 rounded-md mb-2 flex-grow md:flex-grow-0 flex flex-row items-center space-x-2'>
                        out
                    </div>
                </div>
            </div>
        </>
    );
}