export function PageHeading({ title, label, description }: {
  title: string;
  label: string;
  description: string;
}) {
  return <header className="index-page-heading">
    <p className="eyebrow">{label}</p>
    <h1>{title}</h1>
    <p className="index-page-description">{description}</p>
  </header>;
}
