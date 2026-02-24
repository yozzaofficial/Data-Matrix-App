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
    const router = useRouter();

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

function removeFilter(){
    router.replace("/done")
    setSelectValueTech("Technician")
    setSelectValue("Date")
}
    return <>
        <nav className="doneNav">
            <p>Filter:</p>
            <div className="customSelectFilterDoneContainer">
                <CustomSelect
                    width={125} height={40} optionsValues={["Today", "Yesterday", "Last Week"]} defaultSelectValue="Date"
                    setSelectValue={setSelectValue}
                    selectValue={selectValue} />
            </div>
             <div className="customSelectFilterDoneContainer">
                <CustomSelect
                    width={220} height={40} optionsValues={["Mario Rossi", "Luigi centopalle", "Marco Di giansante","rocco","arturo","gioanc","jasd"]} defaultSelectValue="Technician"
                    setSelectValue={setSelectValueTech}
                    selectValue={selectValueTech} />
            </div>
            {(selectValueTech!=="Technician" || selectValue!=="Date") && <button className="removeDoneFilter" onClick={()=>removeFilter()}>X</button>}
        </nav>
    </>
}