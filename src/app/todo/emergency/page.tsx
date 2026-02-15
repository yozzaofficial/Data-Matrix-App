import { requireUser } from "../../../../lib/auth";
import WorkList from "@/app/components/todoComponents/WorkList";

export default async function EmergencyWork() {

    await requireUser("todo");

    return <WorkList />;
}