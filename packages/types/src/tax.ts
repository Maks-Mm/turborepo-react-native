//packages/types/src/tax.ts

export type TaxSource = "BMF" | "Bundesregierung";

export interface TaxUpdate {
  id: string;
  title: string;
  category: "tax" | "law";
  source: TaxSource;
  sourceUrl: string;
  publishedAt: string;
}