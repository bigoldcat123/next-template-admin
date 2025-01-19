import {getBooksByPage } from "@/lib/action";
import Link from "next/link";
import { Edit } from 'lucide-react'
import Image from "next/image";
import DeleteButton from "./deleteButton";
type Props = {
  page: number,
  bookName: string
}
export default async function BookTable({ page, bookName }: Props) {
  console.log(page);
  
  const books = await getBooksByPage(page, { bookName })
  const queryString = new URLSearchParams();
  if (bookName) {
    queryString.set("bookName", bookName);
  }
  if (page) {
    queryString.set("page", page.toString());
  }
  // id: string;
  //   title: string;
  //   author: string;
  //   description: string;
  //   image: string;
  //   borrowed: boolean;
  return (
    <>
      <table className=" w-full bg-red-100 mt-2 rounded-md overflow-hidden">
        <thead>
          <tr className=" h-10 border-b bg-red-200">
            <th className=" text-start">#ID</th>
            <th className=" text-start">Book</th>
            <th className=" text-start">Description</th>
            <th className=" text-start">Author</th>
            <th className=" text-start">Status</th>
            <th className=" text-start">Op</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map((book) => (
              <tr key={book.id} className=" h-10 border-b bg-red-50">
                <td className=" text-start">{book.id}</td>
                <td className=" text-start">
                  <div className=" flex flex-row items-center space-x-2">
                    <Image className=" w-10 h-10" src={book.image} alt="" width={80} height={80} />
                    <span className="">{book.title}</span>
                  </div>
                </td>
                <td className=" text-start "><p className=" max-w-28 line-clamp-1">{book.description} </p></td>
                <td className=" text-start">{book.author}</td>
                <td className=" text-start">{book.borrowed ? 'borrowed' : 'available'}</td>
                <td className=" text-start">
                  <div className=" flex flex-row items-center space-x-2">
                    <Link href={"/dashboard/book/edit/" + book.id + '?' + queryString} className="hover:bg-red-100 p-1 rounded-md"><Edit className=" size-5 text-red-300" /></Link>
                    <DeleteButton id={book.id}/>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}