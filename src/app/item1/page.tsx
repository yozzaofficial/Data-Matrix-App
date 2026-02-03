import { requireUser } from "../../../lib/auth"
import getLocation from "../../../components/getLocation";
export default async function Item1() {
    const location = getLocation()
    const user = await requireUser(location);

    return <>
        <h2>Item 1</h2>
    </>
}