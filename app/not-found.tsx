import Link from "next/link";
import { SiteHeader } from "./components";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <p className="eyebrow">404 · Not found</p>
        <h1>This page wandered off.</h1>
        <Link className="text-link" href="/">
          Return home <span>↗</span>
        </Link>
      </main>
    </>
  );
}
