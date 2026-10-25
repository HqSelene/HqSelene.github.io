import { pageMetadata } from "../seo";
import { SiteFooter, SiteHeader } from "../components";
import { UpdateList } from "../content-components";

export const metadata = pageMetadata("/updates/", "Updates — Qing He", "Recent updates from Qing He.");
export default function UpdatesPage() {
  return <><SiteHeader /><main className="reading-page"><header className="reading-intro">
    <p className="eyebrow">Along the way</p><h1>Updates</h1><p>Research, projects, and things worth sharing.</p>
  </header><UpdateList /></main><SiteFooter /></>;
}
