"use client"
import iconX from "./../../../../public/icon/iconX.png"
import Image from "next/image"

type propsType = {
    isWorkConfirmOpen: boolean,
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WorkConfirm({ isWorkConfirmOpen, setOpenWorkDetail }: propsType) {
    return <div className={isWorkConfirmOpen ? "workConfirm workConfirmTransition" : "workConfirm"}>
        <header>
            <div className="workDetailTitle">
                <h2>Confirm Work</h2>
                <Image src={iconX} alt="Close icon" width={48} height={48} className="closeIcon" onClick={() => setOpenWorkDetail(false)} />
            </div>
        </header>
    </div>
}