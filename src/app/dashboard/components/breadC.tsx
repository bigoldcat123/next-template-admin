'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
    breadCrumbs: {
        name: string,
        url: string
    }[]
}
export default function BreadC({ breadCrumbs }: Props) {
    const pathname = usePathname()

    return (
        <>
            <div className=" flex flex-row">
                {
                    breadCrumbs.map((crumb, index) => (
                        <div key={index} className=" flex flex-row text-4xl items-center">
                            <Link href={crumb.url}><div className=" text-red-200 hover:text-red-300  cursor-pointer">{crumb.name}</div></Link>

                            {index !== breadCrumbs.length - 1 && <Slash className=" text-red-300" />}
                        </div>
                    ))
                }

            </div>
        </>
    );
}