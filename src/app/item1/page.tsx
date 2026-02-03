import { requireUser } from "../../../lib/auth"
import { useLocation } from "react-router-dom"

export default async function Item1() {
    const location = useLocation();
    const user = await requireUser(location.pathname);

    return <>
        <h2>Item 1</h2>
    </>
}