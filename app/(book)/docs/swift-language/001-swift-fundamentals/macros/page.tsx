import { DocHeader } from "@/components/docs/DocHeader";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { FlowChart } from "@/components/docs/FlowChart";
import { findCurrentPage } from "@/lib/nav-utils";
import { getScrapedContent } from "@/lib/use-scraped-content";

export default async function Macros() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/macros");
  const scraped = await getScrapedContent("macros");

  const codeExample1 = `/// Demonstrates freestanding macros in Swift.
///
/// Freestanding macros are called with a # prefix and can produce
/// values or perform compile-time actions.
///
/// ## Expression Macros
/// Macros that produce values at compile time.
func myFunction() {
    print("Currently running \\(#function)")
    #warning("Something's wrong")
}

/// ## Common Freestanding Macros
/// Swift provides several built-in freestanding macros.
let fileName = #file      // Current file path
let lineNumber = #line     // Current line number
let columnNumber = #column // Current column number
let functionName = #function // Current function name

/// ## Custom Freestanding Macros
/// Define your own freestanding macros for code generation.
let magicNumber = #fourCharacterCode("ABCD")
// Expands to: let magicNumber = 1145258561 as UInt32`;

  const codeExample2 = `/// Demonstrates attached macros in Swift.
///
/// Attached macros modify the declaration they're attached to,
/// adding code like methods, properties, or protocol conformances.
///
/// ## Without Macros (Manual)
/// Manually implementing OptionSet requires repetitive code.
struct SundaeToppings: OptionSet {
    let rawValue: Int
    static let nuts = SundaeToppings(rawValue: 1 << 0)
    static let cherry = SundaeToppings(rawValue: 1 << 1)
    static let fudge = SundaeToppings(rawValue: 1 << 2)
}

/// ## With Macros (Automatic)
/// Using @OptionSet macro generates the code automatically.
@OptionSet<Int>
struct SundaeToppings {
    private enum Options: Int {
        case nuts
        case cherry
        case fudge
    }
}

/// The macro automatically generates:
/// - RawValue typealias
/// - rawValue property
/// - init(rawValue:) initializer
/// - Static properties for each case
/// - OptionSet protocol conformance`;

  const codeExample3 = `/// Demonstrates macro declarations and roles.
///
/// Macros have declarations that specify their roles and what
/// code they can generate.
///
/// ## Macro Declaration
/// Declare a macro with its roles and implementation location.
@attached(member, names: named(RawValue), named(rawValue), named(\`init\`), arbitrary)
@attached(extension, conformances: OptionSet)
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
 
/// ## Macro Roles
/// Macros can have different roles:
/// - @attached(member): Adds members to a type
/// - @attached(extension): Adds extensions
/// - @freestanding(expression): Produces a value
/// - @freestanding(declaration): Produces declarations`;

  return (
    <>
      <DocHeader
        title="Macros"
        subtitle="Master Swift macros: compile-time code generation that reduces boilerplate and enables powerful metaprogramming capabilities."
        chapter="001"
        readingTime="~20 min"
        progress={1.0}
      />

      <Callout kind="note" title="Swift Macros">
        Macros are a powerful feature introduced in Swift 5.9 that allow compile-time code generation. They help eliminate boilerplate code while maintaining type safety and performance.
      </Callout>

      <h2>What are Macros?</h2>

      <p>
        Macros are a way to generate code at compile time. They take your source code as input and produce Swift code as output. Macros are expanded during compilation, so they have zero runtime cost and provide full type safety.
      </p>

      <ComparisonTable
        title="Macros vs Other Code Generation"
        headers={["Aspect", "Macros", "Runtime Code", "Code Templates"]}
        rows={[
          {
            feature: "Execution Time",
            option1: (
              <>
                <span className="text-fg">Compile time</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Zero runtime cost
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Runtime</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Performance overhead
                </span>
              </>
            ),
            option3: (
              <>
                <span className="text-fg-muted">Pre-compilation</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Manual generation
                </span>
              </>
            ),
          },
          {
            feature: "Type Safety",
            option1: (
              <>
                <span className="text-fg">Full type checking</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Compiler validates generated code
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Runtime errors</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  May fail at runtime
                </span>
              </>
            ),
            option3: (
              <>
                <span className="text-fg-muted">No validation</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Manual verification
                </span>
              </>
            ),
          },
          {
            feature: "Debugging",
            option1: (
              <>
                <span className="text-fg">View expansion</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Can inspect generated code
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Runtime debugging</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Debug generated code
                </span>
              </>
            ),
            option3: (
              <>
                <span className="text-fg-muted">No debugging</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Generated code only
                </span>
              </>
            ),
          },
        ]}
        caption="Macros provide the best of both worlds: compile-time code generation with full type safety and zero runtime cost."
      />

      <h2>Freestanding Macros</h2>

      <p>
        Freestanding macros are called with a <code>#</code> prefix and can produce values or perform compile-time actions. They're called like functions but are expanded at compile time.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="FreestandingMacros.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h2>Attached Macros</h2>

      <p>
        Attached macros modify the declaration they're attached to. They use the <code>@</code> prefix and can add methods, properties, or protocol conformances to types.
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="AttachedMacros.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Freestanding vs Attached Macros"
        headers={["Feature", "Freestanding (#)", "Attached (@)", "Use Case"]}
        rows={[
          {
            feature: "Syntax",
            option1: (
              <>
                <code className="text-xs">#macroName()</code>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">@macroName</code>
              </>
            ),
            option3: (
              <>
                Freestanding: Produce values
                <br />
                Attached: Modify declarations
              </>
            ),
          },
          {
            feature: "Location",
            option1: (
              <>
                Anywhere in code
              </>
            ),
            option2: (
              <>
                On declarations
              </>
            ),
            option3: (
              <>
                Freestanding: Flexible placement
                <br />
                Attached: Type/function level
              </>
            ),
          },
          {
            feature: "Output",
            option1: (
              <>
                Expression or statement
              </>
            ),
            option2: (
              <>
                Members or extensions
              </>
            ),
            option3: (
              <>
                Freestanding: Values
                <br />
                Attached: Code additions
              </>
            ),
          },
        ]}
        caption="Use freestanding macros for values and compile-time actions. Use attached macros to enhance type declarations."
      />

      <h2>Macro Expansion Process</h2>

      <p>
        Understanding how macros are expanded helps you write better macro-using code and debug issues.
      </p>

      <FlowChart
        title="Macro Expansion Flow"
        caption="How Swift expands macros during compilation"
        width={650}
        height={500}
        nodes={[
          { id: "start", label: "Source Code with Macro", type: "start", position: { x: 325, y: 50 } },
          { id: "parse", label: "Parse to AST", type: "process", position: { x: 325, y: 140 } },
          { id: "find", label: "Find Macro Calls", type: "process", position: { x: 325, y: 230 } },
          { id: "expand", label: "Expand Macro", type: "process", position: { x: 325, y: 320 } },
          { id: "replace", label: "Replace with Generated Code", type: "process", position: { x: 325, y: 410 } },
          { id: "compile", label: "Continue Compilation", type: "end", position: { x: 325, y: 450 } },
        ]}
        edges={[
          { from: "start", to: "parse" },
          { from: "parse", to: "find" },
          { from: "find", to: "expand" },
          { from: "expand", to: "replace" },
          { from: "replace", to: "compile" },
        ]}
      />

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="MacroDeclarations.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      {scraped && scraped.sections.length > 0 && (
        <>
          <h2>Macro Implementation</h2>
          {scraped.sections
            .filter((s: { heading: string }) => s.heading.toLowerCase().includes("implementation") || s.heading.toLowerCase().includes("expansion"))
            .slice(0, 2)
            .map((section: { heading: string; content: string; codeExamples: Array<{ code: string; language?: string }> }, idx: number) => (
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

      <Callout kind="warning" title="Macro Limitations">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Macros run in a sandboxed environment—they can't access the file system or network</li>
          <li>Macro expansion is deterministic—same input always produces same output</li>
          <li>Macros can't read code outside their input AST</li>
          <li>Macro implementations must be in separate modules from code that uses them</li>
        </ul>
      </Callout>

      <KeyTakeaways
        items={[
          "Macros generate code at compile time with zero runtime cost.",
          "Freestanding macros (#) produce values or perform compile-time actions.",
          "Attached macros (@) modify declarations by adding members or conformances.",
          "Macros are type-safe and their generated code is validated by the compiler.",
          "Common use cases include eliminating boilerplate, generating conformances, and code generation.",
        ]}
        mentalModel="Think of macros as code templates that are filled in at compile time. They take your code as input, transform it according to rules, and produce new Swift code that gets compiled normally. This gives you the power of code generation without runtime overhead."
      />

      <PageNavigation
        previous={nav?.previous ? { title: nav.previous.title, href: nav.previous.href } : undefined}
        next={nav?.next ? { title: nav.next.title, href: nav.next.href } : undefined}
      />
    </>
  );
}

