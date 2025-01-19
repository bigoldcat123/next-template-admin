import { Button } from "@/components/ui/button";
import BreadC from "../components/breadC";
import Link from "next/link";
import BookTable from "../components/bookTable";
import SearchC from "../components/search";
import { Suspense } from "react";
import { getPages } from "@/lib/action";
import Pagnination from "../components/bookTablePagination";
import LoadingTable from "../components/loadingTable";
type Props = {
  searchParams: Promise<{
    bookName: string,
    page: string | undefined
  }>
}
export default async function BookPage({
  searchParams
}: Props) {
  const { bookName, page } = await searchParams
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const totalPages = await getPages({ bookName })
  return (
    <>
      <BreadC breadCrumbs={[{ name: "book", url: "/dashboard/book" }]} />
      <div className=" flex flex-row space-x-3">
        <SearchC />
        <Link href="/dashboard/book/create"><Button>Create New</Button></Link>
      </div>
      <div>
        <Suspense key={'' + page + bookName + Date.now()} fallback={<LoadingTable/>}>
          <BookTable bookName={bookName} page={Number(page ?? 1)} />
        </Suspense>
      </div>
      <div>
        <Pagnination totalPages={totalPages}/>
      </div>
    </>
  );
}