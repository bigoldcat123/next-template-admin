import db from "@/lib/db";

for (let index = 0; index < 100; index++) {
    await db.book.createMany({
        data: [
            {
                author: "test",
                description: "test",
                title: "test",
                image: "/test"
            }, {
                author: "test",
                description: "test",
                title: "test",
                image: "/test"
            }
        ]
    })
}
