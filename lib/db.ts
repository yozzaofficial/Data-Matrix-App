import { neon } from "@netlify/neon";
export const sql = neon();
// type SqlFunction = (
//   strings: TemplateStringsArray,
//   ...values: any[]
// ) => Promise<any[]>;

// export const sql: SqlFunction = async (
//   strings,
//   ...values
// ) => {
//   console.log("Mock query:", strings, values);

//   return [
//     { id: 1, nome: "user", password: "user", rank: 0 }
//   ];
// };