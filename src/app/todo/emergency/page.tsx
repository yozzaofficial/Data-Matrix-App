import { requireUser } from "../../../../lib/auth";
import WorkList from "@/app/components/todoComponents/WorkList";

export default async function EmergencyWork({
    searchParams
}: {
    searchParams: { user?: string }
}) {
    const params = await searchParams;
    const user = params.user || "nessun user";
    const pathLocation = `todo?user=${user}`;

    await requireUser(pathLocation);

    return <WorkList />;
}