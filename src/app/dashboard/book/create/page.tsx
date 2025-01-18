import { Label } from "@/components/ui/label";
import BreadC from "../../components/breadC";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// id          String    @id @default(cuid())
//   title       String
//   author      String
//   description String
//   image       String
//   genres      Genre[]
export default function CreatePage() {
    return (
        <>
            <BreadC breadCrumbs={[{ name: "book", url: "/dashboard/book" }, { name: "create", url: "/dashboard/book/create" }]} />

            <form className=" p-8 bg-red-50 rounded-md flex flex-col space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input accept="image/*" id="picture" type="file" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="bn">Book Name</Label>
                    <Input type="text" name="title" id="bn" placeholder="Book Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Author">Author</Label>
                    <Input type="text" name="author" id="Author" placeholder="Author Name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Description">Description</Label>
                    <Textarea name="description" id="Description" placeholder="Description" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Description">Types</Label>
                    <Input name="description" id="Description" placeholder="Description" />
                    <div>abc</div>
                </div>
            </form>
        </>
    );
}