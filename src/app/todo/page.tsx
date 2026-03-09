"use client"
import React from "react";
import WorkList from "../components/todoComponents/WorkList";
import WorkDetail from "../components/todoComponents/WorkDetail";
import { useClickAway } from "ahooks";
import { useRouter } from "next/navigation";

export type MaintenanceItem = {
    id: number;
    name: string;
    description: string;
    "to-do": string;
    "to-do-value": boolean;
    "last-maintance": string;
    note: string;
    emergency: boolean;
};

export default function TodoPage() {
    const [openWorkDetail, setOpenWorkDetail] = React.useState(false);
    const [item, setItem] = React.useState<MaintenanceItem[]>([]);
    const clickAwayRef = React.useRef(null);
    useClickAway(() => {
        setOpenWorkDetail(false);

    }, clickAwayRef);
    return <div className="todoPage">
        <WorkList setOpenWorkDetail={setOpenWorkDetail} item={item} setItem={setItem} />
        {openWorkDetail && <WorkDetail clickAwayRef={clickAwayRef} setOpenWorkDetail={setOpenWorkDetail} item={item[0] ?? null} />}
    </div>
}