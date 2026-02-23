import { fakeData } from "@/app/FakeData"
import arrowIcon from "./../../../../public/icon/iconArrow.png"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation";
import { delay } from "../delay";

type WorkDoneListProps = {
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WorkDoneList({setOpenWorkDetail}: WorkDoneListProps){

    const filteredData= fakeData.filter(d => d.toDoValue ===false)
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    const router = useRouter();

    async function openWorkDetail(id:number){
        if (filter === "date")
                    router.replace(`done?filter=date&id=${id}`)
                else
                    router.replace(`done?filter=technican&id=${id}`)
                await delay(300);
        setOpenWorkDetail(true)
    }

    const liElements = fakeData.map(d => {
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

    

    return<ul className="workDoneList">
        {liElements}
    </ul>
}