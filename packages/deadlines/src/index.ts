//packages/deadlines/src/index.ts


import { Deadline } from "@myorg/types";

export function getDeadlinesForUser(): Deadline[] {
  const now = new Date();

  return [
    {
      id: "vat-april",
      title: "VAT return – April",
      dueDate: "2026-05-10",
      urgency: "high",
      description: "You must submit VAT to Finanzamt",
    },
    {
      id: "income-tax",
      title: "Income tax prepayment",
      dueDate: "2026-06-10",
      urgency: "medium",
      description: "Quarterly tax prepayment",
    },
  ];
}
