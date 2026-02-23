import { fakeData } from "@/app/FakeData"
import arrowIcon from "./../../../../public/icon/iconArrow.png"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation";
import { delay } from "../delay";

type WorkDoneListProps = {
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>
}
function filterMaintenance(filter?: string) {
    if (!filter) return fakeData; // nessun filtro → ritorna tutto

    const today = new Date();
    today.setHours(0, 0, 0, 0); // azzera ore/minuti/secondi

    return fakeData.filter(d => {
        const itemDate = new Date(d.lastMaintenance + "T00:00:00"); // forza mezzanotte locale
        itemDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
            (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (filter === "Today") return diffDays === 0;
        if (filter === "Yesterday") return diffDays === 1;
        if (filter === "Last Week") return diffDays >= 1 && diffDays <= 7;

        return true; // default: nessun filtro specifico
    });
}
export default function WorkDoneList({ setOpenWorkDetail }: WorkDoneListProps) {

    const filteredData = fakeData.filter(d => d.toDoValue === false)
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    const filterTime = searchParams.get("time");
    const router = useRouter();
    const filteredDataTime = filterMaintenance(filterTime || undefined);
    console.log(filterTime)
    async function openWorkDetail(id: number) {
        if (filter === "date" && filterTime === "")
            router.replace(`done?filter=date&id=${id}`)
        else if (filter === "date" && filterTime !== "")
            router.replace(`done?filter=date&time=${filterTime}&id=${id}`)
        else
            router.replace(`done?filter=technician&id=${id}`)
        await delay(300);
        setOpenWorkDetail(true)
    }
    const dataToRender = filter
        ? filteredDataTime
        : filteredData;

    const liElements = dataToRender.map(d => {
        return <li
            key={d.id}
            className="workDone"
            onClick={() => openWorkDetail(d.id)}>
            {d.description}
            <div className="doneWorkIcon">
                <Image src={arrowIcon} alt="arrowIcon" width={40} height={40} />
            </div>
        </li>
    })



    return <ul className="workDoneList">
        {liElements.length > 0 ? liElements : <p className="noWorkDone">No work done yet</p>}
    </ul>
}