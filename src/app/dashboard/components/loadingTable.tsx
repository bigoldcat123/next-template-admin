
export default async function LoadingTable() {
    return (
        <>
            <table className=" animate-pulse w-full bg-red-100 mt-2 rounded-md overflow-hidden">
                <thead>
                    <tr className=" h-10 border-b bg-red-200">
                        {/* <th className=" text-start">#ID</th>
                        <th className=" text-start">Book</th>
                        <th className=" text-start">Description</th>
                        <th className=" text-start">Author</th>
                        <th className=" text-start">Status</th>
                        <th className=" text-start">Op</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: 10 }).map((_, idx) => (
                            <tr key={idx} className="h-10 border-b bg-red-50">
                                <th className=" text-start"></th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}