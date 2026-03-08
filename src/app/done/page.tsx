"use client"
import React from "react"
import WorkDoneList from "./../components/doneComponents/WorkDoneList"
import WorkDoneInfo from "../components/doneComponents/WorkDoneInfo";
import { useClickAway } from "ahooks";
export default function DonePage() {

    const [openWorkDetail, setOpenWorkDetail] = React.useState(false);
    const clickAwayRef = React.useRef(null);
    const [item, setItem] = React.useState<any[]>([])

    useClickAway(() => {
        setOpenWorkDetail(false);
    }, clickAwayRef);

    React.useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/getDoneItems")

            const data = await res.json()
            console.log(data)
            setItem(data)
        }

        load()
    }, [])

    return (<>
        <main className="workDoneMain">
            <WorkDoneList setOpenWorkDetail={setOpenWorkDetail} item={item} />
            {openWorkDetail && <WorkDoneInfo setOpenWorkDetail={setOpenWorkDetail} clickAwayRef={clickAwayRef} item={item} />}
        </main>

    </>
    );
}