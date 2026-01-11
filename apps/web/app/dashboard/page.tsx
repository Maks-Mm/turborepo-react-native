//apps/web/app/dashboard/page.tsx
"use client";


"use client";

import { useEffect, useState } from "react";
import { fetchDeadlines } from "@myorg/api-client";
import { Deadline } from "@myorg/types";

export default function Dashboard() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    fetchDeadlines().then(setDeadlines);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your deadlines</h1>

      <div className="mt-4 space-y-4">
        {deadlines.map(d => (
          <div
            key={d.id}
            className="border p-4 rounded-lg shadow-sm"
          >
            <div className="font-semibold">{d.title}</div>
            <div>Due: {d.dueDate}</div>
            <div className="text-sm text-gray-500">{d.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
