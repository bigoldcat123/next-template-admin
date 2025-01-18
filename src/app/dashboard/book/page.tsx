import { Button } from "@/components/ui/button";
import BreadC from "../components/breadC";
import { Search } from 'lucide-react'
import Link from "next/link";
type Props = {
  searchParams: Promise<{
    bookName: string,
    page: string
  }>
}
export default async function BookPage({
  searchParams
}: Props) {
  const { bookName, page } = await searchParams
  return (
    <>
      <BreadC breadCrumbs={[{ name: "book", url: "/dashboard/book" }]} />
      <div className=" flex flex-row space-x-3">
        <div className=" border-2 border-red-200 rounded-md w-56 relative">
          <input type="text" placeholder='book name' className=' py-1 pl-8 focus:outline-none w-full' />
          <Search className=" text-red-400 absolute w-4 h-4 top-2 left-2 pointer-events-none" />
        </div>
        <Link href="/dashboard/book/create"><Button>Create New</Button></Link>
      </div>
      <div>
        table
      </div>
      <div>
        pagination
      </div>
    </>
  );
}