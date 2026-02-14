import { requireUser } from "../../../../lib/auth";
import WorkList from "@/app/components/todoComponents/WorkList";

export default async function EmergencyWork({
    searchParams
}: {
    searchParams: { user?: string }
}) {
    const params = await searchParams;

    const pathLocation = params.user === "user"
        ? "todo?user=user"
        : "todo";

    await requireUser(pathLocation);

    return <WorkList />;
}