import { DocHeader } from "@/components/docs/DocHeader";
import { DiagramCard } from "@/components/docs/DiagramCard";
import { ArcDiagram } from "@/components/docs/ArcDiagram";
import { Callout } from "@/components/docs/Callout";
import { CompareBlock } from "@/components/docs/CompareBlock";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default async function RetainCyclesInARC() {
  const codeExample1 = `final class ProfileViewController: UIViewController {
    var onDismiss: (() -> Void)?

    override func viewDidLoad() {
        super.viewDidLoad()

        // onDismiss is stored on self (strong).
        // The closure captures self (strong) => cycle.
        onDismiss = {
            self.dismiss(animated: true)
        }
    }
}`;

  const codeExample2 = `final class ProfileViewController: UIViewController {
    var onDismiss: (() -> Void)?

    override func viewDidLoad() {
        super.viewDidLoad()

        onDismiss = { [weak self] in
            guard let self else { return }
            self.dismiss(animated: true)
        }
    }
}`;

  return (
    <>
      <DocHeader
        title="Retain Cycles in ARC"
        subtitle="A retain cycle happens when objects keep each other alive through strong references—so ARC can't reduce any reference count to zero."
        chapter="002"
        readingTime="~6 min"
        progress={0.22}
      />

      <DiagramCard
        title="Reference graph: where the cycle forms"
        caption="Strong edges keep reference counts > 0. Breaking any strong edge allows ARC to deallocate."
      >
        <ArcDiagram />
      </DiagramCard>

      <Callout kind="note" title="Plain-English checkpoint">
        ARC can only free memory when an object's strong reference count reaches zero.
        In a retain cycle, each object is the reason the other object's count never
        reaches zero.
      </Callout>

      <h2>Minimal reproducer</h2>

      <CodeBlock
        code={codeExample1}
        lang="swift"
        filename="RetainCycle.swift"
        showLineNumbers={true}
      />

      <h2>Fix: weaken the capture</h2>

      <CodeBlock
        code={codeExample2}
        lang="swift"
        filename="RetainCycle.swift"
        showLineNumbers={true}
      />

      <CompareBlock
        bad={
          <>
            <p>
              The closure strongly captures <code>self</code>. Because <code>self</code>{" "}
              also strongly owns the closure, neither can be freed.
            </p>
            <div className="mt-3">
              <Callout kind="warning" title="Symptom">
                View controllers don't deinit after dismissal; memory grows with each
                presentation.
              </Callout>
            </div>
          </>
        }
        good={
          <>
            <p>
              Use <code>[weak self]</code> for stored closures (or delegates) that can
              outlive a single call stack. Then safely unwrap.
            </p>
            <div className="mt-3">
              <Callout kind="info" title="Result">
                ARC can drop the last strong reference and deallocate normally.
              </Callout>
            </div>
          </>
        }
      />

      <KeyTakeaways
        items={[
          "A retain cycle is a reference graph problem: strong edges form a loop.",
          "Stored closures are the most common source of accidental strong captures.",
          "Fix the graph: break one strong edge (often with [weak self]).",
          "Prefer explicit ownership: decide who owns what, and make it visible in code.",
        ]}
        mentalModel="Think of your objects as nodes in a graph. If there's a closed loop of strong edges, ARC can't 'walk out' of it to free memory."
      />
    </>
  );
}
