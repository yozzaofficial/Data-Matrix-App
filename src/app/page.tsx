import { requireUser } from "../../lib/auth";
import { redirect } from "next/navigation"


export default async function Home() {
  const location = "/";

  const user = await requireUser(location);
  redirect("/todo")
  return (
    <div>
      <h1>Maintance App</h1>;
    </div>
  );
}
