import BreadC from "@/app/dashboard/components/breadC";
import TypeInput from "@/app/dashboard/components/typeInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getBookTypes, geyBookById, updateBook } from "@/lib/action";

type Props = {
    params: Promise<{
        id: string
    }>,
    searchParams: Promise<{
        bookName: string,
        page: string
    }>
}
export default async function EditPage({ params,searchParams }:Props) {
    const { id } = await params
    const book = await geyBookById(id)
    const { bookName, page } = await searchParams
    const search = new URLSearchParams()
    if (bookName) {
        search.set("bookName", bookName)
    }
    if (page) {
        search.set("page", page)
    }
    const genres = await getBookTypes()
    return (
        <>
            <BreadC breadCrumbs={[{ name: "book", url: "/dashboard/book?" + search }, { name: "edit", url: "/dashboard/book/edit/" + id }]} />
            <form action={updateBook} className=" p-8 bg-red-50 rounded-md flex flex-col space-y-4">
                <input type="hidden" name="id" defaultValue={book.id}/>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input accept="image/*" name="picture" id="picture" type="file" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="bn">Book Name</Label>
                    <Input defaultValue={book.title} required type="text" name="title" id="bn" placeholder="Book Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Author">Author</Label>
                    <Input defaultValue={book.author} required type="text" name="author" id="Author" placeholder="Author Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Description">Description</Label>
                    <Textarea defaultValue={book.description} required name="description" id="Description" placeholder="Description" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <TypeInput defaultValue={book.genres}  genres={genres}/>
                </div>
                <div>
                    <Button>Edit</Button>
                </div>
            </form>
        </>
    );
}