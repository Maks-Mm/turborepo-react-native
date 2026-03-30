//packages/ui/src/components/tax/TaxFeed.tsx

import TaxCard from "./TaxCard";

export default function TaxFeed({ updates }) {
  return (
    <>
      {updates.map((u) => (
        <TaxCard
          key={u.id}
          title={u.title}
          source={u.source}
          date={u.publishedAt}
        />
      ))}
    </>
  );
}