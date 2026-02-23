"use client"
import React from "react"
import WorkDoneList from "./../components/doneComponents/WorkDoneList"
import WorkDoneInfo from "../components/doneComponents/WorkDoneInfo";
export default function DonePage() {

    const [openWorkDetail, setOpenWorkDetail] = React.useState(false);

    return (<>
        <main className="workDoneMain">
            <WorkDoneList setOpenWorkDetail={setOpenWorkDetail}/>
            {openWorkDetail && <WorkDoneInfo setOpenWorkDetail={setOpenWorkDetail}/>}
        </main>
       
    </>
    );
}