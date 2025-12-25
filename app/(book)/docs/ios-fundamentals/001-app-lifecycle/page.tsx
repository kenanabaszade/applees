import { Callout } from "@/components/docs/Callout";
import { DocHeader } from "@/components/docs/DocHeader";

export default function AppLifecycleOverviewPage() {
  return (
    <div className="space-y-8">
      <DocHeader
        title="App Lifecycle (Overview)"
        subtitle="A mental model for how your app boots, becomes active, backgrounds, and resumes—so you put logic in the right place."
        chapter="001"
        readingTime="~4 min"
        progress={0.0}
      />

      <Callout kind="note" title="Coming soon">
        This chapter is scaffolded to demonstrate the book navigation and page
        template. Next up: a diagram-first overview of scenes, state
        transitions, and what belongs in App/Scene delegates vs view models.
      </Callout>
    </div>
  );
}


