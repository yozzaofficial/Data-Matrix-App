"use client"
import { fakeData } from "@/app/FakeData"
import { useSearchParams } from "next/navigation";
import emergencyIcon from "./../../../../public/icon/emergencyicon.png"
import arrowIcon from "./../../../../public/icon/iconArrow.png";
import Image from "next/image";

export default function WorkList() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");

    const filteredData = fakeData.filter(e => {
        if (filter === "emergency") {
            return e.emergency === true;
        }
        if (filter === "regular") {
            return e.emergency === false;
        }
        return true;
    });

    const liElements = filteredData.map(e => (
        <li key={e.id} className="work">
            {e.name}
            <div className="todoWorkIcon">
                {e.emergency && <div className="emergencyIcon"></div>}
                <Image src={arrowIcon} alt="arrowIcon" width={40} height={40} />
            </div>
        </li>
    ));
    return <ul className="workList">
        {liElements}
    </ul>
}