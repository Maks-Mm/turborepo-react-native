//packages/ui/src/components/tax/TaxCard.tsx

export default function TaxCard({ title, source, date }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{source}</p>
      <p>{date}</p>
    </div>
  );
}