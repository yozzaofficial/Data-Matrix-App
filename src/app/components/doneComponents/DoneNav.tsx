"use client"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation";
import CustomSelect from "../CustomSelect";
import React from "react";
import { useClickAway } from "ahooks";

export default function DoneNav() {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString())
    const [selectValue, setSelectValue] = React.useState("Date")
    const [selectValueTech, setSelectValueTech] = React.useState("Technician")
    const [selectOpen, setSelectOpen] = React.useState(false)
    const [selectOpen2, setSelectOpen2] = React.useState(false)
    const router = useRouter();

    const clickAwayRefDate = React.useRef(null);
    const clickAwayRefName = React.useRef(null);

    useClickAway(() => {
        setSelectOpen(false);
    }, clickAwayRefDate);
    useClickAway(() => {
        setSelectOpen2(false);
    }, clickAwayRefName);

    React.useEffect(() => {
        const params = new URLSearchParams()

        if (selectValue !== "Date") {
            params.set("time", selectValue)
        }

        if (selectValueTech !== "Technician") {
            params.set("name", selectValueTech)
        }

        const query = params.toString()

        router.replace(query ? `/done?${query}` : "/done")
    }, [selectValue, selectValueTech])

    function removeFilter() {
        router.replace("/done")
        setSelectValueTech("Technician")
        setSelectValue("Date")
        setSelectOpen(false)
        setSelectOpen2(false)
    }
    return <>
        <nav className="doneNav">
            <p>Filter:</p>
            <div className="customSelectFilterDoneContainer">
                <CustomSelect
                    width={125} height={30} optionsValues={["Today", "Yesterday", "Last Week"]} defaultSelectValue="Date"
                    setSelectValue={setSelectValue}
                    selectValue={selectValue}
                    setIsOpen={setSelectOpen}
                    isOpen={selectOpen}
                    clickAwayRef={clickAwayRefDate} />
            </div>
            <div className="customSelectFilterDoneContainer">
                <CustomSelect
                    width={200} height={30} optionsValues={["Mario Rossi", "Luigi centopalle", "Marco giansante", "rocco", "arturo", "gioanc", "jasd"]} defaultSelectValue="Technician"
                    setSelectValue={setSelectValueTech}
                    selectValue={selectValueTech}
                    setIsOpen={setSelectOpen2}
                    isOpen={selectOpen2}
                    clickAwayRef={clickAwayRefName} />
            </div>
            {(selectValueTech !== "Technician" || selectValue !== "Date") && <button className="removeDoneFilter" onClick={() => removeFilter()}>X</button>}
        </nav>
    </>
}