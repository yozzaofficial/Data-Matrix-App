"use client"

import Image from "next/image"
import { fakeData } from "@/app/FakeData"
import { useSearchParams } from "next/navigation";
import closeIcon from "./../../../../public/icon/iconX.png"
import iconV from "./../../../../public/icon/iconV.png"

export default function WorkDetail({ clickAwayRef }: { clickAwayRef: React.RefObject<null> }) {
    const searchParams = useSearchParams();
    const filter = searchParams.get("id");
    const filterInNumber = Number(filter);
    const filteredData = fakeData.find(e => e.id === filterInNumber);
    const data = filteredData;
    return <div className="workDetail" ref={clickAwayRef}>
        <header>
            <div className="workDetailTitle">
                <h2>{data?.name}</h2>
                <Image src={closeIcon} alt="Close icon" width={48} height={48} className="closeIcon" />
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
            <button className="workDetailButton workDetailButtonCancel">Cancel</button>
            <button className="workDetailButton">Complete</button>
        </div>
    </div>
}