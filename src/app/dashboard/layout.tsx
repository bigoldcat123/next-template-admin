import BreadC from "./components/breadC"
import NavBar from "./components/navBar"

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className=" h-screen  w-full flex md:flex-row flex-col">
                <NavBar />
                <div className="flex-grow md:p-8 px-4 overflow-auto">
                    {children}
                </div>
            </div>
        </>
    )
}