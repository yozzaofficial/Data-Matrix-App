"use client"
import arrowIcon from "./../../../../public/icon/iconArrow.png"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation";
import { delay } from "../delay";
import React from "react";

type WorkDoneListProps = {
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>,
    item: any[]
}

function filterMaintenance(filter?: string, item: any[] = []) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return item.filter(d => {
        const itemDate = new Date(d.last_maintenance);
        itemDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
            (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (filter === "Today") return diffDays === 0;
        if (filter === "Yesterday") return diffDays === 1;
        if (filter === "Last Week") return diffDays >= 1 && diffDays <= 7;

        return true;
    });
}

export default function WorkDoneList({ setOpenWorkDetail, item }: WorkDoneListProps) {


    // prima era toDoValue
    const filteredData = item
    const searchParams = useSearchParams();
    const filterTime = searchParams.get("time");
    const filterTech = searchParams.get("name");

    const router = useRouter();

    const filteredDataTime = filterMaintenance(filterTime || undefined, item);



    async function openWorkDetail(id: string) {
        if (filterTime !== null)
            router.replace(`done?time=${filterTime}&id=${id}`)
        else if (filterTech !== null)
            router.replace(`done?name=${filterTech}&id=${id}`)
        else
            router.replace(`done?id=${id}`)

        await delay(300);
        setOpenWorkDetail(true)
    }

    function getDataToRender() {
        if (filterTime !== null)
            return filteredDataTime
        else
            return filteredData
    }

    function getDataToRender2(data: any[]) {
        if (filterTech !== null) {
            const filtered = data.filter(e => e.technician === filterTech)
            return filtered
        }
        else
            return data
    }

    const filterTimeIsActive = getDataToRender()
    const dataToRender = getDataToRender2(filterTimeIsActive)

    const liElements = dataToRender.map(d => {
        return (
            <li
                key={d.id}
                className="workDone"
                onClick={() => openWorkDetail(d.id)}
            >
                {d.nameitem}
                <div className="doneWorkIcon">
                    <Image src={arrowIcon} alt="arrowIcon" width={40} height={40} />
                </div>
            </li>
        )
    })

    return (
        <ul className="workDoneList">
            {liElements.length > 0 ? liElements : <p className="noWorkDone">No work done yet</p>}
        </ul>
    )
}