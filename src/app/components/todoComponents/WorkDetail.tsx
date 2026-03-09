"use client"
import React from "react";
import Image from "next/image"
import { fakeData } from "@/app/FakeData"
import { useSearchParams } from "next/navigation";
import closeIcon from "./../../../../public/icon/iconX.png"
import iconV from "./../../../../public/icon/iconV.png"
import WorkConfirm from "./WorkConfirm";
import { MaintenanceItem } from "@/app/todo/page";
type propsType = {
    clickAwayRef: React.RefObject<null>,
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>,
    item: MaintenanceItem[]
}

export default function WorkDetail({ clickAwayRef, setOpenWorkDetail }: propsType) {
    const searchParams = useSearchParams();
    const filter = searchParams.get("id");
    const filterInNumber = Number(filter);

    const [isWorkConfirmedOpen, setIsWorkConfirmedOpen] = React.useState(false);
    const [item, setItem] = React.useState<any[]>([])

    React.useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/getTodoItems")
            const data = await res.json()
            setItem(data)
        }

        load()
    }, [])
    const filteredData = item.find(e => e.id === filterInNumber);
    const data = filteredData;


    return <div className="workDetail" ref={clickAwayRef}>
        <header>
            <div className="workDetailTitle">
                <h2>{data?.name}</h2>
                <Image src={closeIcon} alt="Close icon" width={48} height={48} className="closeIcon" onClick={() => setOpenWorkDetail(false)} />
            </div>
        </header>
        <main className="workDetailBody">
            <div className="workDetailDesc">
                <div>
                    <h2>Description</h2>
                    <h3>{data?.Description}</h3>
                    <Image src={iconV} alt="Icon V" width={40} height={40} className="iconV" />
                </div>
                <p>{data?.["to-do"]}</p>
            </div>
            <div className="lastMaintanceDiv">
                <h3>Last Maintance:</h3>
                <p>{data?.["last-maintance"]}</p>
            </div>
        </main>
        <footer>
            <h3>Note:</h3>
            <p className="nodeText">{data?.note}</p>
            <div>
                <p>Loaded by: Admin</p>
            </div>
        </footer>
        <div className="workDetailButtonsContainer">
            <button className="workDetailButton workDetailButtonCancel" onClick={() => setOpenWorkDetail(false)}>Cancel</button>
            <button className="workDetailButton" onClick={() => setIsWorkConfirmedOpen(true)}>Complete</button>
        </div>
        <WorkConfirm isWorkConfirmOpen={isWorkConfirmedOpen} setOpenWorkDetail={setOpenWorkDetail} setIsWorkConfirmOpen={setIsWorkConfirmedOpen} itemData={data} />
    </div>
}