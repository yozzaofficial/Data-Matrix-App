"use client"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation";
import CustomSelect from "../CustomSelect";
import React from "react";

export default function DoneNav() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    const [selectValue, setSelectValue] = React.useState("Date")
    const router = useRouter();

    React.useEffect(() => {
        if (selectValue !== "Date")
            router.replace(`done?filter=date&time=${selectValue}`)
    }, [selectValue])

    return <>
        <nav className="doneNav">
            {/* <Link
                href="/done?filter=date"
                className={filter === "date" ? "doneNavActive" : ""}
            >
                Date//Select
            </Link> */}
            <div className="customSelectFilterDoneContainer">
                <CustomSelect
                    width={125} height={40} optionsValues={["Today", "Yesterday", "Last Week"]} defaultSelectValue="Date"
                    setSelectValue={setSelectValue}
                    selectValue={selectValue} />
            </div>
            <Link
                href="/done?filter=technician"
                className={filter === "technician" ? "doneNavActive" : ""}
            >
                Technician//select
            </Link>
        </nav>
    </>
}