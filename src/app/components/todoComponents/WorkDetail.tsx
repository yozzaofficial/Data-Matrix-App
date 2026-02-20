"use client"
import React from "react";
import Image from "next/image"
import { fakeData } from "@/app/FakeData"
import { useSearchParams } from "next/navigation";
import closeIcon from "./../../../../public/icon/iconX.png"
import iconV from "./../../../../public/icon/iconV.png"
import WorkConfirm from "./WorkConfirm";

type propsType = {
    clickAwayRef: React.RefObject<null>,
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WorkDetail({ clickAwayRef, setOpenWorkDetail }: propsType) {
    const searchParams = useSearchParams();
    const filter = searchParams.get("id");
    const filterInNumber = Number(filter);
    const filteredData = fakeData.find(e => e.id === filterInNumber);
    const data = filteredData;
    const [isWorkConfirmedOpen, setIsWorkConfirmedOpen] = React.useState(false);

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
                    <h3>Description</h3>
                    <Image src={iconV} alt="Icon V" width={40} height={40} className="iconV" />
                </div>
                <p>{data?.toDo}</p>
            </div>
            <div className="lastMaintanceDiv">
                <h3>Last Maintance:</h3>
                <p>{data?.lastMaintenance}</p>
            </div>
        </main>
        <footer>
            <h3>Note:</h3>
            <p className="nodeText">{data?.note}</p>
            <div>
                <p>Loaded by: {data?.loadedBy}</p>
            </div>
        </footer>
        <div className="workDetailButtonsContainer">
            <button className="workDetailButton workDetailButtonCancel" onClick={() => setOpenWorkDetail(false)}>Cancel</button>
            <button className="workDetailButton" onClick={() => setIsWorkConfirmedOpen(true)}>Complete</button>
        </div>
        <WorkConfirm isWorkConfirmOpen={isWorkConfirmedOpen} setOpenWorkDetail={setOpenWorkDetail} setIsWorkConfirmOpen={setIsWorkConfirmedOpen}/>
    </div>
}