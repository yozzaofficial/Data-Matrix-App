import Image from "next/image";
import styles from "./page.module.css";
import { getPostById } from "../../lib/lib";
type Post = {
  id: number;
  name: string;
};

export default async function Home() {
  const posts: Post[] = (await getPostById()) as Post[];

  if (!posts || posts.length === 0) {
    return <div>Post non trovato</div>;
  }

  const data = posts.map((e: Post) => (
    <div key={e.id}>
      <p>{e.id}</p>
      <p>{e.name}</p>
    </div>
  ));

  return (
    <div>
      <p>qui</p>
      {data}
    </div>
  );
}
