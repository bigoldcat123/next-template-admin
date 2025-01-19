import { Label } from "@/components/ui/label";
import BreadC from "../../components/breadC";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBook, getBookTypes } from "@/lib/action";
import { Button } from "@/components/ui/button";
import TypeInput from "../../components/typeInput";

export default async function CreatePage() {
    const genres =await getBookTypes()
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
                    <TypeInput defaultValue={[]} genres={genres} />
                </div>
                <div>
                    <Button>Create</Button>
                </div>
            </form>
        </>
    );
}
