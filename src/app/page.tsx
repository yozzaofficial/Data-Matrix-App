import { requireUser } from "../../lib/auth";
import { usePathname } from "next/navigation";

type Post = {
  id: number;
  nome: string;
};

export default async function Home() {
  const location = usePathname();

  const user = await requireUser(location);
  return (
    <div>
      <h1>Ciao {user.nome}</h1>;
    </div>
  );
}
