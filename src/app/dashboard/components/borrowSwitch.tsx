'use client'

import StatusSwitch from "@/components/ui/statusSwitch";
import { setBorrowed } from "@/lib/action";
import { useState } from "react";

type Props = {
    borrowed: boolean
    id:string
}
export default function BorrowSwitch({ id,borrowed }: Props) {
    const [isBorrowed, setIsBorrowed] = useState(borrowed)
    function handleChange(value: boolean) {
        setIsBorrowed(value)
        setBorrowed(id,value)
    }
    return (
        <>
            <StatusSwitch value={isBorrowed} onChange={handleChange} />
        </>
    );
}