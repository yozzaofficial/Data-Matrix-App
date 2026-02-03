import { requireUser } from "../../lib/auth";
import { useLocation } from "react-router-dom"

type Post = {
  id: number;
  nome: string;
};

export default async function Home() {
  const location = useLocation();

  const user = await requireUser(location.pathname);
  return (
    <div>
      <h1>Ciao {user.nome}</h1>;
    </div>
  );
}
