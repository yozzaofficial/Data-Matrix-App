import { requireUser } from "../../lib/auth";
import getLocation from "../../components/getLocation";
import { get } from "http";
type Post = {
  id: number;
  nome: string;
};

export default async function Home() {
  const location = getLocation();

  const user = await requireUser(location);
  return (
    <div>
      <h1>Ciao {user.nome}</h1>;
    </div>
  );
}
