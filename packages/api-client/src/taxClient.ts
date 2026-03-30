//packages/api-client/src/taxClient.ts

import { TaxUpdate } from "@repo/types";

export async function fetchTaxUpdates(): Promise<TaxUpdate[]> {
  const res = await fetch("http://localhost:3001/taxes/de");
  return res.json();
}