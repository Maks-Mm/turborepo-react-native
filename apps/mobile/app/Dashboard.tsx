//app/mobile/app/Dashboard.tsx
"use client";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { fetchDeadlines } from "@repo/api-client";
import { Deadline } from "@repo/types";

export default function Dashboard() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    fetchDeadlines().then(setDeadlines);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Your deadlines</Text>

      {deadlines.map(d => (
        <View key={d.id} style={{ marginTop: 10 }}>
          <Text>{d.title}</Text>
          <Text>{d.dueDate}</Text>
        </View>
      ))}
    </View>
  );
}
