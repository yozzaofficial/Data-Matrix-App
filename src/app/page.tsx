import Image from "next/image";
import styles from "./page.module.css";
import { getPostById } from "../../lib/lib";

export default async function Home() {
  const post = await getPostById(); // esempio: ID = 1

  if (!post) {
    return <div>Post non trovato</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}