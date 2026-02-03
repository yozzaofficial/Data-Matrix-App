import { requireUser } from "../../../lib/auth"
export default async function Item1() {
    const location = "item1"
    const user = await requireUser(location);

    return <>
        <h2>Item 1</h2>
    </>
}