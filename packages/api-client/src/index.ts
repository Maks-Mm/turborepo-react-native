//package/api-client/src/index.ts


import { Deadline } from "@repo/types";

export async function fetchDeadlines(): Promise<Deadline[]> {
  const res = await fetch("http://localhost:3001/deadlines");
  return res.json();
}
