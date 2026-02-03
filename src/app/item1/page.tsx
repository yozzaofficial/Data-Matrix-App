import { requireUser } from "../../../lib/auth"
import { usePathname } from "next/navigation";

export default async function Item1() {
    const location = usePathname();
    const user = await requireUser(location);

    return <>
        <h2>Item 1</h2>
    </>
}