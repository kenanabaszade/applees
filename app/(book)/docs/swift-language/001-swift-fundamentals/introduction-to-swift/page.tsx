import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { FlowChart } from "@/components/docs/FlowChart";
import { findCurrentPage } from "@/lib/nav-utils";
import { getScrapedContent } from "@/lib/use-scraped-content";

export default async function IntroductionToSwift() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/introduction-to-swift");
  const scraped = await getScrapedContent("introduction-to-swift");
  
  const codeExample1 = `/// Constants and variables for tracking login attempts.
///
/// This example demonstrates the difference between constants (let)
/// and variables (var) in Swift.
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0`;

  const codeExample2 = `/// Demonstrates Swift's basic operators.
///
/// Swift provides a comprehensive set of operators for arithmetic,
/// comparison, logical operations, and more.
///
/// ## Arithmetic Operators
/// Basic mathematical operations on numeric types.
let sum = 10 + 5        // 15
let difference = 10 - 5 // 5
let product = 10 * 5    // 50
let quotient = 10 / 5   // 2
let remainder = 10 % 3  // 1

/// ## Comparison Operators
/// Compare two values and return a Boolean result.
let isEqual = (5 == 5)      // true
let isNotEqual = (5 != 3)   // true
let isGreater = (10 > 5)    // true
let isLess = (3 < 7)        // true

/// ## Logical Operators
/// Combine Boolean values using logical AND, OR, and NOT.
let andResult = true && false  // false
let orResult = true || false   // true
let notResult = !true          // false

/// ## Range Operators
/// Create ranges of values for iteration and indexing.
let closedRange = 1...5        // 1, 2, 3, 4, 5
let halfOpenRange = 1..<5      // 1, 2, 3, 4

/// ## Nil-Coalescing Operator
/// Provides a default value when an optional is nil.
///
/// - Parameter optionalValue: An optional integer that may be nil
/// - Returns: The unwrapped value or the default value (0)
let optionalValue: Int? = nil
let defaultValue = optionalValue ?? 0  // Returns 0 if optionalValue is nil`;

  const codeExample3 = `/// Demonstrates Swift's type safety and type inference.
///
/// Swift is a type-safe language that prevents type mismatches at compile time.
/// It also uses type inference to automatically determine types from context.
///
/// > Note: Type safety helps catch errors before your code runs.
///
/// ## Type Safety
/// Swift prevents accidental type mismatches.
let number: Int = 42
// let text: String = number // ❌ Error: Cannot convert value

/// ## Type Inference
/// Swift automatically infers types from initial values.
let integer = 42           // Inferred as Int
let decimal = 3.14         // Inferred as Double
let text = "Hello"         // Inferred as String
let isActive = true        // Inferred as Bool

/// ## Explicit Type Conversion
/// Convert between types using initializers.
///
/// - Returns: Converted values of the target type
let stringFromInt = String(42)        // "42"
let intFromString = Int("42")        // Optional(42)
let doubleFromInt = Double(42)       // 42.0`;

  return (
    <>
      <DocHeader
        title="Introduction to Swift"
        subtitle="Learn the fundamentals of Swift: Xcode setup, Playgrounds, constants, variables, type safety, type inference, and basic operators."
        chapter="001"
        readingTime="~8 min"
        progress={0.2}
      />

      <Callout kind="note" title="What is Swift?">
        Swift is a powerful and intuitive programming language developed by Apple for building applications across iOS, macOS, watchOS, and tvOS. It combines performance and safety, making it suitable for both beginners and experienced developers.
      </Callout>

      <h2>Xcode Setup and Playgrounds</h2>

      <p>
        Xcode is Apple's integrated development environment (IDE) for building apps. To get started:
      </p>

      <h3>Installing Xcode</h3>
      <p>
        Download Xcode from the Mac App Store. It includes the Swift compiler, iOS Simulator, and all necessary tools for development.
      </p>

      <h3>Using Playgrounds</h3>
      <p>
        Swift Playgrounds are interactive coding environments where you can experiment with Swift code and see results immediately. They're perfect for learning and prototyping.
      </p>

      <p>
        To create a new Playground:
      </p>
      <ol>
        <li>Open Xcode</li>
        <li>Select "File" → "New" → "Playground"</li>
        <li>Choose a template (Blank, iOS, or macOS)</li>
        <li>Start coding!</li>
      </ol>

      <h2>Constants and Variables</h2>

      {scraped?.sections.find(s => s.heading === "Constants and Variables")?.content && (
        <p>
          {scraped.sections.find(s => s.heading === "Constants and Variables")?.content.split('\n\n')[0]}
        </p>
      )}

      <p>
        Swift uses two keywords to declare values. Understanding when to use each is fundamental to writing good Swift code:
      </p>

      <ComparisonTable
        title="Constants vs Variables"
        headers={["Aspect", "let (Constants)", "var (Variables)", "When to Use"]}
        rows={[
          {
            feature: "Mutability",
            option1: (
              <>
                <span className="text-fg">Immutable</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Cannot be changed after initialization
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg">Mutable</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Can be changed after initialization
                </span>
              </>
            ),
            option3: (
              <>
                <code>let</code>: Default choice, use for most values
                <br />
                <code>var</code>: Only when value must change
              </>
            ),
          },
          {
            feature: "Safety",
            option1: (
              <>
                <span className="text-fg">Prevents accidental changes</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Compiler enforces immutability
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Allows changes</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  More prone to bugs from unexpected mutations
                </span>
              </>
            ),
            option3: (
              <>
                <code>let</code>: Safer, thread-safe by default
              </>
            ),
          },
          {
            feature: "Performance",
            option1: (
              <>
                <span className="text-fg">Better optimization</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Compiler can optimize immutable values
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Standard performance</span>
              </>
            ),
            option3: (
              <>
                <code>let</code>: Slightly better performance
              </>
            ),
          },
          {
            feature: "Example",
            option1: (
              <>
                <code className="text-accent text-xs">let pi = 3.14159</code>
                <br />
                <code className="text-accent text-xs">let name = "Alice"</code>
              </>
            ),
            option2: (
              <>
                <code className="text-accent text-xs">var count = 0</code>
                <br />
                <code className="text-accent text-xs">var currentUser: User?</code>
              </>
            ),
            option3: (
              <>
                Use <code>let</code> for values that don't change
                <br />
                Use <code>var</code> for counters, state, or optional values
              </>
            ),
          },
        ]}
        caption="Swift's philosophy: prefer immutability. Use let by default, and only use var when you truly need mutability. This makes code safer, clearer, and easier to reason about."
      />

      <h3>Declaring Constants and Variables</h3>

      {scraped?.sections.find(s => s.heading === "Declaring Constants and Variables")?.content && (
        <>
          <p>
            {scraped.sections.find(s => s.heading === "Declaring Constants and Variables")?.content.split('\n\n').slice(0, 3).join('\n\n')}
          </p>
          <DocCBlock
            code={codeExample1}
            lang="swift"
            showLineNumbers={true}
            showDocumentation={true}
          />
        </>
      )}

      <Callout kind="warning" title="Best Practice">
        If a stored value in your code won't change, always declare it as a constant with the <code>let</code> keyword. Use variables only for storing values that change.
      </Callout>

      <h3>Type Annotations</h3>

      {scraped?.sections.find(s => s.heading === "Type Annotations")?.content && (
        <>
          <p>
            {scraped.sections.find(s => s.heading === "Type Annotations")?.content.split('\n\n').slice(0, 4).join('\n\n')}
          </p>
          {scraped.sections.find(s => s.heading === "Type Annotations")?.codeExamples.map((ex, idx) => (
            <CodeBlock
              key={idx}
              code={ex.code}
              lang={ex.language || "swift"}
              showLineNumbers={true}
            />
          ))}
        </>
      )}

      <h3>Naming Constants and Variables</h3>

      {scraped?.sections.find(s => s.heading === "Naming Constants and Variables")?.content && (
        <>
          <p>
            Constant and variable names can contain almost any character, including Unicode characters:
          </p>
          {scraped.sections.find(s => s.heading === "Naming Constants and Variables")?.codeExamples.map((ex, idx) => (
            <CodeBlock
              key={idx}
              code={ex.code}
              lang={ex.language || "swift"}
              showLineNumbers={true}
            />
          ))}
        </>
      )}

      <h2>Type Safety and Type Inference</h2>

      {scraped?.sections.find(s => s.heading === "Type Safety and Type Inference")?.content && (
        <>
          <p>
            {scraped.sections.find(s => s.heading === "Type Safety and Type Inference")?.content.split('\n\n').slice(0, 3).join('\n\n')}
          </p>
          {scraped.sections.find(s => s.heading === "Type Safety and Type Inference")?.codeExamples.map((ex, idx) => (
            <CodeBlock
              key={idx}
              code={ex.code}
              lang={ex.language || "swift"}
              showLineNumbers={true}
            />
          ))}
        </>
      )}

      <h2>Numeric Type Conversion</h2>

      {scraped?.sections.find(s => s.heading === "Integer Conversion")?.content && (
        <>
          <p>
            {scraped.sections.find(s => s.heading === "Integer Conversion")?.content.split('\n\n').slice(0, 2).join('\n\n')}
          </p>
          {scraped.sections.find(s => s.heading === "Integer Conversion")?.codeExamples.map((ex, idx) => (
            <CodeBlock
              key={idx}
              code={ex.code}
              lang={ex.language || "swift"}
              showLineNumbers={true}
            />
          ))}
        </>
      )}

      {scraped?.sections.find(s => s.heading === "Integer and Floating-Point Conversion")?.content && (
        <>
          <h3>Integer and Floating-Point Conversion</h3>
          <p>
            {scraped.sections.find(s => s.heading === "Integer and Floating-Point Conversion")?.content.split('\n\n')[0]}
          </p>
          {scraped.sections.find(s => s.heading === "Integer and Floating-Point Conversion")?.codeExamples.map((ex, idx) => (
            <CodeBlock
              key={idx}
              code={ex.code}
              lang={ex.language || "swift"}
              showLineNumbers={true}
            />
          ))}
        </>
      )}

      <h2>Basic Operators</h2>

      <p>
        Swift provides a comprehensive set of operators for performing operations:
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="Operators.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h3>Operator Categories</h3>

      <ul>
        <li><strong>Arithmetic:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code></li>
        <li><strong>Comparison:</strong> <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></li>
        <li><strong>Logical:</strong> <code>&&</code>, <code>||</code>, <code>!</code></li>
        <li><strong>Range:</strong> <code>...</code> (closed range), <code>..&lt;</code> (half-open range)</li>
        <li><strong>Nil-coalescing:</strong> <code>??</code> (provides default value for optionals)</li>
      </ul>

      <KeyTakeaways
        items={[
          "Use let for constants and var for variables. Prefer let when possible.",
          "Swift is type-safe: types are checked at compile time to prevent errors.",
          "Type inference allows Swift to determine types automatically from initial values.",
          "Operators in Swift include arithmetic, comparison, logical, range, and nil-coalescing operators.",
          "Playgrounds provide an interactive environment for learning and experimenting with Swift.",
        ]}
        mentalModel="Think of constants (let) as values that are set once and never change, while variables (var) are containers that can hold different values over time. Swift's type system acts as a safety net, catching errors before your code runs."
      />

      <PageNavigation
        previous={nav?.previous ? { title: nav.previous.title, href: nav.previous.href } : undefined}
        next={nav?.next ? { title: nav.next.title, href: nav.next.href } : undefined}
      />
    </>
  );
}

