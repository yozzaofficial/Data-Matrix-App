"use client"
import { fakeData } from "@/app/FakeData"
import arrowIcon from "./../../../../public/icon/iconArrow.png"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation";
import { delay } from "../delay";
import React from "react";
type WorkDoneListProps = {
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>
}
function filterMaintenance(filter?: string) {
    if (!filter) return fakeData; // nessun filtro → ritorna tutto

    const today = new Date();
    today.setHours(0, 0, 0, 0); // azzera ore/minuti/secondi

    return fakeData.filter(d => {
        const itemDate = new Date(d.lastMaintenance + "T00:00:00"); // forza mezzanotte locale
        itemDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
            (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (filter === "Today") return diffDays === 0;
        if (filter === "Yesterday") return diffDays === 1;
        if (filter === "Last Week") return diffDays >= 1 && diffDays <= 7;

        return true; // default: nessun filtro specifico
    });
}
export default function WorkDoneList({ setOpenWorkDetail }: WorkDoneListProps) {

    const filteredData = fakeData.filter(d => d.toDoValue === false)
    const searchParams = useSearchParams();
    const filterTime = searchParams.get("time");
    const filterTech=searchParams.get("name");
    
    const router = useRouter();
    const filteredDataTime = filterMaintenance(filterTime || undefined);

    async function openWorkDetail(id: number) {
        if (filterTime !== null)
            router.replace(`done?time=${filterTime}&id=${id}`)
        else if(filterTech !==null)
            router.replace(`done?name=${filterTech}&id=${id}`)
        else
            router.replace(`done?id=${id}`)
        await delay(300);
        setOpenWorkDetail(true)
    }

    function getDataToRender(){
        if(filterTime!==null)
            return filteredDataTime
        else 
            return filteredData
    }

    function getDataToRender2(filterTime: typeof fakeData){
        if(filterTech !== null)
        {
            const data = filterTime.filter(e => e.technician===filterTech)
            return data
        }
        else
            return filterTime

    }

    const filterTimeIsActive = getDataToRender()

    const dataToRender= (getDataToRender2(filterTimeIsActive));


    const liElements = dataToRender.map(d => {
        return <li
            key={d.id}
            className="workDone"
            onClick={() => openWorkDetail(d.id)}>
            {d.description}
            <div className="doneWorkIcon">
                <Image src={arrowIcon} alt="arrowIcon" width={40} height={40} />
            </div>
        </li>
    })



    return <ul className="workDoneList">
        {liElements.length > 0 ? liElements : <p className="noWorkDone">No work done yet</p>}
    </ul>
}