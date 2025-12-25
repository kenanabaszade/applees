import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";

export default async function IntroductionToSwift() {
  const codeExample1 = `// Variables - values that can change
var greeting = "Hello, World!"
greeting = "Hello, Swift!" // ✅ Allowed

// Constants - values that cannot change
let pi = 3.14159
// pi = 3.14 // ❌ Error: Cannot assign to value: 'pi' is a 'let' constant

// Type annotation (explicit)
let age: Int = 25
let name: String = "Alice"

// Type inference (implicit)
let inferredAge = 25 // Swift infers this as Int
let inferredName = "Bob" // Swift infers this as String`;

  const codeExample2 = `// Basic arithmetic operators
let sum = 10 + 5        // 15
let difference = 10 - 5 // 5
let product = 10 * 5    // 50
let quotient = 10 / 5   // 2
let remainder = 10 % 3  // 1

// Comparison operators
let isEqual = (5 == 5)      // true
let isNotEqual = (5 != 3)   // true
let isGreater = (10 > 5)    // true
let isLess = (3 < 7)        // true

// Logical operators
let andResult = true && false  // false
let orResult = true || false   // true
let notResult = !true          // false

// Range operators
let closedRange = 1...5        // 1, 2, 3, 4, 5
let halfOpenRange = 1..<5      // 1, 2, 3, 4

// Nil-coalescing operator
let optionalValue: Int? = nil
let defaultValue = optionalValue ?? 0  // Returns 0 if optionalValue is nil`;

  const codeExample3 = `// Type safety - Swift prevents type mismatches
let number: Int = 42
// let text: String = number // ❌ Error: Cannot convert value

// Type inference with different types
let integer = 42           // Inferred as Int
let decimal = 3.14         // Inferred as Double
let text = "Hello"         // Inferred as String
let isActive = true        // Inferred as Bool

// Explicit type conversion when needed
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

      <p>
        Swift uses two keywords to declare values:
      </p>

      <ul>
        <li><strong><code>let</code></strong> - Declares a constant (immutable value)</li>
        <li><strong><code>var</code></strong> - Declares a variable (mutable value)</li>
      </ul>

      <CodeBlock
        code={codeExample1}
        lang="swift"
        filename="ConstantsAndVariables.swift"
        showLineNumbers={true}
      />

      <Callout kind="warning" title="Best Practice">
        Prefer <code>let</code> over <code>var</code> whenever possible. Using constants makes your code safer and more predictable by preventing accidental modifications.
      </Callout>

      <h2>Type Safety and Type Inference</h2>

      <p>
        Swift is a <strong>type-safe</strong> language, meaning every variable and constant has a specific type, and Swift ensures you use values correctly. This prevents many common programming errors.
      </p>

      <CodeBlock
        code={codeExample3}
        lang="swift"
        filename="TypeSafety.swift"
        showLineNumbers={true}
      />

      <h3>Type Inference</h3>
      <p>
        Swift can automatically infer the type of a variable or constant based on its initial value. This means you don't always need to explicitly declare the type:
      </p>

      <p>
        Type inference makes code cleaner and easier to read while maintaining full type safety at compile time.
      </p>

      <h2>Basic Operators</h2>

      <p>
        Swift provides a comprehensive set of operators for performing operations:
      </p>

      <CodeBlock
        code={codeExample2}
        lang="swift"
        filename="Operators.swift"
        showLineNumbers={true}
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
    </>
  );
}

