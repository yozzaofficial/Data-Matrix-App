import { fakeData } from "@/app/FakeData"
import { useSearchParams } from "next/navigation"
import Image from "next/image";
import closeIcon from "./../../../../public/icon/iconX.png"

type WorkDoneListProps = {
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WorkDoneInfo({setOpenWorkDetail}: WorkDoneListProps){

    const searchParams = useSearchParams();
    const filter = searchParams.get("id");
    const filterInNumber = Number(filter);
    const filteredData = fakeData.find(e=> e.id===filterInNumber)
    const data = filteredData
    
    return<div className="workDetail" >
         <header>
            <div className="workDetailTitle">
                <h2>{data?.name}</h2>
                <Image src={closeIcon} alt="Close icon" width={48} height={48} className="closeIcon"
                onClick={()=> setOpenWorkDetail(false)}  />
            </div>
        </header>
            {data?.description}
    </div>
}