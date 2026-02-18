"use client"
import React from "react";
import WorkList from "../components/todoComponents/WorkList";
import WorkDetail from "../components/todoComponents/WorkDetail";
import { useClickAway } from "ahooks";

export default function TodoPage() {
    const [openWorkDetail, setOpenWorkDetail] = React.useState(false);
    const clickAwayRef = React.useRef(null);
    useClickAway(() => {
        setOpenWorkDetail(false);
    }, clickAwayRef);
    return <div className="todoPage">
        <WorkList setOpenWorkDetail={setOpenWorkDetail} />
        {openWorkDetail && <WorkDetail clickAwayRef={clickAwayRef} />}
    </div>
}