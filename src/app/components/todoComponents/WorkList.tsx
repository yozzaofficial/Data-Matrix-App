import { fakeData } from "@/app/FakeData"

export default function WorkList() {

    const liElements = fakeData.map(e => {
        return <li key={e.id} className="work">
            {e.name}
        </li>
    })
    return <ul className="workList">
        {liElements}
    </ul>
}