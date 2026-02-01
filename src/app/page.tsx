import Image from "next/image";
import styles from "./page.module.css";
import { getPostById } from "../../lib/lib";

export default async function Home() {
  const post = await getPostById(); // esempio: ID = 1

  if (!post) {
    return <div>Post non trovato</div>;
  }
  const data = post.map((e: { id: number; name: string }) => (
    <div key={e.id}>
      <p>{e.id}</p>
      <p>{e.name}</p>
    </div>
  ));
  return (
    <div>
      {data}
    </div>
  );
}