"use client"
import React from "react";
import { fakeData } from "@/app/FakeData"
import { useSearchParams, useRouter } from "next/navigation";
import emergencyIcon from "./../../../../public/icon/emergencyicon.png"
import arrowIcon from "./../../../../public/icon/iconArrow.png";
import Image from "next/image";
import { delay } from "../delay";

type WorkListProps = {
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WorkList({ setOpenWorkDetail }: WorkListProps) {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    const router = useRouter();
    React.useEffect(() => { //set filter emergency default
        if (!filter) {
            router.replace(`todo?filter=emergency`);
        }
    }, [filter, router]);
    const filteredData = fakeData.filter(e => {
        if (filter === "emergency") {
            return e.emergency === true;
        }
        if (filter === "regular") {
            return e.emergency === false;
        }
        return true;
    });

    async function openWorkDetail(id: number) {
        await delay(500);
        if (filter === "emergency")
            router.replace(`todo?filter=emergency&id=${id}`)
        else
            router.replace(`todo?filter=regular&id=${id}`)
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