"use client"
import React from "react"
import WorkDoneList from "./../components/doneComponents/WorkDoneList"
import WorkDoneInfo from "../components/doneComponents/WorkDoneInfo";
import { useClickAway } from "ahooks";
export default function DonePage() {

    const [openWorkDetail, setOpenWorkDetail] = React.useState(false);
    const clickAwayRef = React.useRef(null);
    useClickAway(() => {
            setOpenWorkDetail(false);
        }, clickAwayRef);

    return (<>
        <main className="workDoneMain">
            <WorkDoneList setOpenWorkDetail={setOpenWorkDetail} />
            {openWorkDetail && <WorkDoneInfo setOpenWorkDetail={setOpenWorkDetail} clickAwayRef={clickAwayRef}/>}
        </main>
       
    </>
    );
}