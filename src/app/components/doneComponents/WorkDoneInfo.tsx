import { fakeData } from "@/app/FakeData"
import { useSearchParams } from "next/navigation"
import Image from "next/image";
import closeIcon from "./../../../../public/icon/iconX.png"

type WorkDoneListProps = {
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>,
    clickAwayRef: React.RefObject<null>,
}

export default function WorkDoneInfo({ setOpenWorkDetail, clickAwayRef }: WorkDoneListProps) {

    const searchParams = useSearchParams();
    const filter = searchParams.get("id");
    const filterInNumber = Number(filter);
    const filteredData = fakeData.find(e => e.id === filterInNumber)
    const data = filteredData

    return <div className="workDetail" ref={clickAwayRef}>
        <header>
            <div className="workDetailTitle">
                <h2>{data?.name}</h2>
                <Image src={closeIcon} alt="Close icon" width={48} height={48} className="closeIcon"
                    onClick={() => setOpenWorkDetail(false)} />
            </div>
        </header>
        <main className="workDetailTodoBody">
            <div>
                <h3>Description</h3>
                <p>{data?.note}</p>
            </div>
            <div className="lastMaintanceDiv">
                <h3>Last Maintance:</h3>
                <p>{data?.lastMaintenance}</p>
            </div>
            <div className="lastTechnicianDiv">
                <h3>Technician</h3>
                <p>{data?.technician}</p>
            </div>
        </main>
    </div>
}