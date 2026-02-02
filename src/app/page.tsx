import { requireUser } from "../../lib/auth";
type Post = {
  id: number;
  nome: string;
};

export default async function Home() {

  const user = await requireUser();
  return (
    <div>
      <h1>Ciao {user.nome}</h1>;
    </div>
  );
}
