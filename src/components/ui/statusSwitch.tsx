'use client'
import { cn } from "@/lib/utils";
type Props = {
    value: boolean,
    onChange: (value: boolean) => void
}
export default function StatusSwitch({value, onChange}: Props) {
    // const [status, setStatus] = useState(value)
    return (
        <>
            <button onClick={() => { onChange(!value) }} className=" h-7 relative border w-16 rounded-xl shadow-inner shadow-red-100">
                <div className={cn("  ease-in transition-all duration-200 top-1/2 -translate-y-1/2 absolute size-5  rounded-full", {
                    'left-[3%] bg-gray-500': !value,
                    'left-[66%] bg-red-300': value
                })}></div>
            </button>
        </>
    );
}