"use client"
import React from "react";
import { fakeData } from "@/app/FakeData"
import { useSearchParams, useRouter } from "next/navigation";
import emergencyIcon from "./../../../../public/icon/emergencyicon.png"
import arrowIcon from "./../../../../public/icon/iconArrow.png";
import Image from "next/image";
import { delay } from "../delay";
import { MaintenanceItem } from "@/app/todo/page";

type WorkListProps = {
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>,
    item: MaintenanceItem[],
    setItem: React.Dispatch<React.SetStateAction<MaintenanceItem[]>>

}

export default function WorkList({ setOpenWorkDetail, item = [], setItem }: WorkListProps) {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    const filterId = searchParams.get("id") || "";
    const router = useRouter();
    React.useEffect(() => { //set filter emergency default
        if (!filter) {

            router.replace(`todo?filter=emergency`);
        }
    }, [filter, router]);

    React.useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/getTodoItems")
            const data = await res.json()
            setItem(data)
        }

        load()
    }, [])



    let filteredData = item.filter(e => {
        if (filter === "emergency") {
            return e.emergency === true;
        }
        if (filter === "regular") {
            return e.emergency === false;
        }
        return true;
    });

    filteredData = filteredData.filter(e => e["to-do-value"] === true)

    if (filterId !== "")
        filteredData = filteredData.filter(e => e.id === Number(filterId))

    async function openWorkDetail(id: number) {
        if (filter === "emergency")
            router.replace(`todo?filter=emergency&id=${id}`)
        else
            router.replace(`todo?filter=regular&id=${id}`)
        await delay(300);
        setOpenWorkDetail(true);
    }



    const liElements = filteredData.map(e => (
        <li
            key={e.id}
            className="work"
            onClick={() => openWorkDetail(e.id)}>
            {e.name}
            <div className="todoWorkIcon">
                {e.emergency && <div className="emergencyIcon"></div>}
                <Image src={arrowIcon} alt="arrowIcon" width={40} height={40} />
            </div>
        </li>
    ));
    return <ul className="workList">
        {liElements}
    </ul>
}