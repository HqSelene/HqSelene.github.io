export function PublicationAward({ award }: { award?: string }) {
  if (!award?.trim()) return null;
  return (
    <span className="publication-award">
      <span>{award}</span>
    </span>
  );
}
