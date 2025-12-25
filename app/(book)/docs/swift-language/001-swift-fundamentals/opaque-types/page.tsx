import { DocHeader } from "@/components/docs/DocHeader";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { FlowChart } from "@/components/docs/FlowChart";
import { findCurrentPage } from "@/lib/nav-utils";
import { getScrapedContent } from "@/lib/use-scraped-content";

export default async function OpaqueTypes() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/opaque-types");
  const scraped = await getScrapedContent("opaque-and-boxed-protocol-types");

  const codeExample1 = `/// Demonstrates the problem that opaque types solve.
///
/// When using generics, the exact types leak into the public API,
/// exposing implementation details that should be hidden.
///
/// ## Generic Approach (Leaks Types)
/// The return type exposes the exact generic types used.
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\\n")
        return lines.reversed().joined(separator: "\\n")
    }
}

struct JoinedShape<T: Shape, U: Shape>: Shape {
    var top: T
    var bottom: U
    func draw() -> String {
        return top.draw() + "\\n" + bottom.draw()
    }
}

/// This exposes implementation details:
/// JoinedShape<Triangle, FlippedShape<Triangle>>

/// ## Opaque Type Approach (Hides Types)
/// The return type hides implementation details.
func flip<T: Shape>(_ shape: T) -> some Shape {
    return FlippedShape(shape: shape)
}

func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
    return JoinedShape(top: top, bottom: bottom)
}

/// Now the return type is just "some Shape"
let shape = join(smallTriangle, flip(smallTriangle))`;

  const codeExample2 = `/// Demonstrates opaque return types.
///
/// Opaque types use \`some\` keyword to hide the concrete type
/// while maintaining type identity and enabling type inference.
///
/// ## Basic Opaque Return Type
/// Return a specific type without exposing it.
func makeTrapezoid() -> some Shape {
    let top = Triangle(size: 2)
    let middle = Square(size: 2)
    let bottom = FlippedShape(shape: top)
    let trapezoid = JoinedShape(
        top: top,
        bottom: JoinedShape(top: middle, bottom: bottom)
    )
    return trapezoid
}

/// ## Opaque Types with Generics
/// Combine opaque types with generic parameters.
func flip<T: Shape>(_ shape: T) -> some Shape {
    return FlippedShape(shape: shape)
}

func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
    return JoinedShape(top: top, bottom: bottom)
}

/// ## Type Identity Preserved
/// Opaque types preserve type identity for type inference.
let opaqueJoined = join(smallTriangle, flip(smallTriangle))
// Type is "some Shape" but Swift knows the concrete type internally`;

  const codeExample3 = `/// Demonstrates boxed protocol types (existential types).
///
/// Boxed protocol types use \`any\` keyword and allow storing
/// different concrete types that conform to the protocol.
///
/// ## Boxed Protocol Type
/// Use \`any\` to create a type-erased container.
struct VerticalShapes: Shape {
    var shapes: [any Shape]  // Boxed protocol type
    func draw() -> String {
        return shapes.map { $0.draw() }.joined(separator: "\\n\\n")
    }
}

let largeTriangle = Triangle(size: 5)
let largeSquare = Square(size: 5)
let vertical = VerticalShapes(shapes: [largeTriangle, largeSquare])
print(vertical.draw())

/// ## Downcasting Boxed Types
/// Use type casting to access the underlying type.
if let downcastTriangle = vertical.shapes[0] as? Triangle {
    print(downcastTriangle.size)  // Can access Triangle-specific properties
}`;

  return (
    <>
      <DocHeader
        title="Opaque and Boxed Protocol Types"
        subtitle="Master opaque types (some) and boxed protocol types (any) to hide implementation details while maintaining type safety and flexibility."
        chapter="001"
        readingTime="~18 min"
        progress={1.0}
      />

      <Callout kind="note" title="Type Abstraction">
        Opaque types and boxed protocol types provide different ways to abstract over types. Understanding when to use each is crucial for writing flexible, maintainable Swift code.
      </Callout>

      <h2>The Problem</h2>

      <p>
        When using generics, the exact types used in your implementation leak into your public API. This exposes implementation details that should be hidden, making your API harder to use and maintain.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="OpaqueTypesProblem.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h2>Opaque Types (some)</h2>

      <p>
        Opaque types use the <code>some</code> keyword to hide the concrete return type while preserving type identity. They're like the reverse of generics: the function implementation chooses the type, not the caller.
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="OpaqueTypes.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h2>Boxed Protocol Types (any)</h2>

      <p>
        Boxed protocol types (also called existential types) use the <code>any</code> keyword to create type-erased containers that can hold any type conforming to the protocol. They provide runtime flexibility at the cost of some performance.
      </p>

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="BoxedTypes.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Opaque Types vs Boxed Protocol Types"
        headers={["Feature", "some (Opaque)", "any (Boxed)", "When to Use"]}
        rows={[
          {
            feature: "Type Identity",
            option1: (
              <>
                <span className="text-fg">Preserved</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  One specific type
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Erased</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Any conforming type
                </span>
              </>
            ),
            option3: (
              <>
                some: When you need type identity
                <br />
                any: When you need runtime flexibility
              </>
            ),
          },
          {
            feature: "Performance",
            option1: (
              <>
                <span className="text-fg">No overhead</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Direct type usage
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Indirection cost</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Box adds overhead
                </span>
              </>
            ),
            option3: (
              <>
                some: Better performance
              </>
            ),
          },
          {
            feature: "Flexibility",
            option1: (
              <>
                <span className="text-fg-muted">Single type</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Must return same type
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg">Multiple types</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Can store different types
                </span>
              </>
            ),
            option3: (
              <>
                any: When you need heterogeneous collections
              </>
            ),
          },
          {
            feature: "Associated Types",
            option1: (
              <>
                <span className="text-fg">Supported</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Can infer associated types
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Not supported</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Can't use with associated types
                </span>
              </>
            ),
            option3: (
              <>
                some: Required for protocols with associated types
              </>
            ),
          },
        ]}
        caption="Use some (opaque types) when you want to hide implementation details while preserving type identity. Use any (boxed types) when you need to store different types in collections."
      />

      <FlowChart
        title="Choosing Between some and any"
        caption="Decision tree for selecting the right type abstraction"
        width={700}
        height={500}
        nodes={[
          { id: "start", label: "Need type abstraction?", type: "start", position: { x: 350, y: 50 } },
          { id: "collection", label: "Need heterogeneous collection?", type: "decision", position: { x: 350, y: 150 } },
          { id: "associated", label: "Protocol has associated types?", type: "decision", position: { x: 350, y: 280 } },
          { id: "performance", label: "Performance critical?", type: "decision", position: { x: 350, y: 410 } },
          { id: "use-any", label: "Use any", type: "end", position: { x: 550, y: 450 } },
          { id: "use-some", label: "Use some", type: "end", position: { x: 150, y: 450 } },
        ]}
        edges={[
          { from: "start", to: "collection" },
          { from: "collection", to: "use-any", label: "Yes" },
          { from: "collection", to: "associated", label: "No" },
          { from: "associated", to: "use-some", label: "Yes" },
          { from: "associated", to: "performance", label: "No" },
          { from: "performance", to: "use-some", label: "Yes" },
          { from: "performance", to: "use-any", label: "No" },
        ]}
      />

      {scraped && scraped.sections.length > 0 && (
        <>
          <h2>Detailed Examples</h2>
          {scraped.sections.slice(0, 3).map((section, idx) => (
            <div key={idx} className="my-6">
              <h3>{section.heading}</h3>
              <p className="text-fg-muted leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
              {section.codeExamples.length > 0 && (
                <DocCBlock
                  code={section.codeExamples[0].code}
                  lang="swift"
                  showLineNumbers={true}
                />
              )}
            </div>
          ))}
        </>
      )}

      <Callout kind="info" title="Swift 5.7+">
        <p className="text-sm mb-2">
          In Swift 5.7 and later, you must explicitly use <code>any</code> when using a protocol as a type. This makes the performance cost explicit and helps you choose the right abstraction.
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs text-fg-muted">
          <li>Before Swift 5.7: <code>var shape: Shape</code> (implicit any)</li>
          <li>Swift 5.7+: <code>var shape: any Shape</code> (explicit any)</li>
        </ul>
      </Callout>

      <KeyTakeaways
        items={[
          "Opaque types (some) hide concrete types while preserving type identity and enabling type inference.",
          "Boxed protocol types (any) provide runtime flexibility but with performance overhead.",
          "Use some when you need to hide implementation details and preserve type identity.",
          "Use any when you need to store different types in collections or need runtime flexibility.",
          "Opaque types support protocols with associated types; boxed types do not.",
        ]}
        mentalModel="Think of some (opaque) as a sealed box with a specific item inside—you know it's there but can't see it. Think of any (boxed) as a transparent container that can hold different items, but accessing them requires unwrapping."
      />

    </>
  );
}

