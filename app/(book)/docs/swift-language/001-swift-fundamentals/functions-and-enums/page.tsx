import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { FlowChart } from "@/components/docs/FlowChart";
import { CompareBlock } from "@/components/docs/CompareBlock";
import { findCurrentPage } from "@/lib/nav-utils";

export default async function FunctionsAndEnums() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/functions-and-enums");
  const codeExample1 = `/// Demonstrates basic function syntax in Swift.
///
/// Functions are reusable blocks of code that perform specific tasks.
/// They help organize code, reduce duplication, and make programs easier to understand.
///
/// ## Simple Function
/// A function that takes a parameter and returns a value.
///
/// - Parameter name: The person's name to greet
/// - Returns: A greeting message
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

let message = greet(name: "Alice")
print(message)  // "Hello, Alice!"

/// ## Function with Multiple Parameters
/// Functions can accept multiple parameters of different types.
///
/// - Parameter a: The first number
/// - Parameter b: The second number
/// - Returns: The sum of a and b
func add(a: Int, b: Int) -> Int {
    return a + b
}

let sum = add(a: 5, b: 3)  // 8

/// ## Function with No Return Value
/// Functions that don't return a value use \`Void\` (or omit the return type).
///
/// - Parameter name: The person's name to greet
func printGreeting(name: String) {
    print("Hello, \\(name)!")
}

/// ## Function Returning Multiple Values
/// Use tuples to return multiple values from a function.
///
/// - Parameter array: An array of integers
/// - Returns: A tuple containing the minimum and maximum values
///
/// > Note: This function assumes the array is not empty. In production, add error handling.
func minMax(array: [Int]) -> (min: Int, max: Int) {
    let currentMin = array[0]
    let currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}

let bounds = minMax(array: [8, -6, 2, 109, 3, 71])
print("min is \\(bounds.min) and max is \\(bounds.max)")`;

  const codeExample2 = `/// Demonstrates advanced function features in Swift.
///
/// Swift provides powerful features for making functions more flexible
/// and expressive, including parameter labels, default values, and variadic parameters.
///
/// ## External and Internal Parameter Names
/// Use different names for function calls (external) and function body (internal).
///
/// - Parameter person: The person's name (external: person, internal: person)
/// - Parameter hometown: Where the person is from (external: from, internal: hometown)
/// - Returns: A personalized greeting message
func greet(person: String, from hometown: String) -> String {
    return "Hello \\(person)! Glad you could visit from \\(hometown)."
}

let greeting = greet(person: "Bill", from: "Cupertino")

/// ## Omitting Argument Labels
/// Use underscore (\`_\`) to omit the external parameter name.
///
/// > Note: This makes function calls more concise but less self-documenting.
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // firstParameterName and secondParameterName refer to the argument values
}

someFunction(1, secondParameterName: 2)

/// ## Default Parameter Values
/// Provide default values to make parameters optional when calling.
///
/// - Parameter name: The person's name
/// - Parameter greeting: The greeting to use (defaults to "Hello")
/// - Returns: A greeting message
///
/// > Note: Parameters with default values must come after parameters without defaults.
func greet(name: String, greeting: String = "Hello") -> String {
    return "\\(greeting), \\(name)!"
}

greet(name: "Alice")              // "Hello, Alice!"
greet(name: "Bob", greeting: "Hi")  // "Hi, Bob!"

/// ## Variadic Parameters
/// Accept zero or more values of a specified type.
///
/// - Parameter numbers: One or more Double values
/// - Returns: The arithmetic mean of all numbers
///
/// > Note: A function can have at most one variadic parameter.
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}

arithmeticMean(1, 2, 3, 4, 5)  // 3.0`;

  const codeExample3 = `/// Demonstrates closures in Swift.
///
/// Closures are self-contained blocks of functionality that can be passed around
/// and used in your code. They capture values from their surrounding context,
/// making them powerful tools for callbacks, functional programming, and more.
///
/// ## Closure Syntax Variations
/// Swift provides multiple ways to write closures, from verbose to concise.
let numbers = [1, 2, 3, 4, 5]

/// Full closure syntax with explicit types.
let doubled = numbers.map({ (number: Int) -> Int in
    return number * 2
})

/// Shorthand with inferred types.
let tripled = numbers.map({ number in number * 3 })

/// Trailing closure with shorthand argument names.
let squared = numbers.map { $0 * $0 }

/// ## Closures as Function Parameters
/// Pass closures to functions for flexible behavior.
///
/// - Parameter numbers: An array of integers
/// - Parameter operation: A closure that transforms each integer
/// - Returns: A new array with transformed values
func operate(on numbers: [Int], operation: (Int) -> Int) -> [Int] {
    return numbers.map(operation)
}

let result = operate(on: [1, 2, 3]) { $0 * 10 }

/// ## Capturing Values
/// Closures capture and store references to constants and variables.
///
/// - Parameter incrementAmount: The amount to increment by
/// - Returns: A closure that increments a running total
///
/// > Warning: This creates a closure that captures \`total\` and \`incrementAmount\`.
/// > The captured values persist between calls.
func makeIncrementer(incrementAmount: Int) -> () -> Int {
    var total = 0
    let incrementer: () -> Int = {
        total += incrementAmount
        return total
    }
    return incrementer
}

let incrementByTen = makeIncrementer(incrementAmount: 10)
incrementByTen()  // 10
incrementByTen()  // 20`;

  const codeExample4 = `/// Demonstrates enumerations (enums) in Swift.
///
/// Enums define a common type for a group of related values, enabling
/// type-safe code and making your intentions clear. They're more powerful
/// than simple constants and can carry associated data.
///
/// ## Basic Enumeration
/// Simple enums define a set of related cases.
enum CompassPoint {
    case north
    case south
    case east
    case west
}

var direction = CompassPoint.north
direction = .south  // Can use shorthand when type is known

/// ## Switch with Enum
/// Switch statements work perfectly with enums, ensuring all cases are handled.
switch direction {
case .north:
    print("Heading north")
case .south:
    print("Heading south")
case .east:
    print("Heading east")
case .west:
    print("Heading west")
}

/// ## Enum with Raw Values
/// Enums can have raw values (Int, String, Character, etc.).
///
/// > Note: Raw values must be unique and are set at compile time.
enum Planet: Int {
    case mercury = 1
    case venus = 2
    case earth = 3
    case mars = 4
}

let earth = Planet.earth
print(earth.rawValue)  // 3

/// ## Enum with Associated Values
/// Enums can store associated values of any type with each case.
///
/// > Note: Associated values are set at runtime and can differ for each instance.
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

var productBarcode = Barcode.upc(8, 85909, 51226, 3)
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")

switch productBarcode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \\(numberSystem), \\(manufacturer), \\(product), \\(check)")
case .qrCode(let productCode):
    print("QR code: \\(productCode)")
}`;

  return (
    <>
      <DocHeader
        title="Functions and Enums"
        subtitle="Learn function syntax, closures, and enumerations—essential building blocks for organizing and structuring Swift code."
        chapter="001"
        readingTime="~15 min"
        progress={0.8}
      />

      <Callout kind="note" title="Functions and Enums">
        Functions allow you to organize code into reusable blocks, while enumerations provide a type-safe way to work with groups of related values. Together, they form the foundation of well-structured Swift code.
      </Callout>

      <h2>Function Syntax</h2>

      <p>
        Functions are self-contained chunks of code that perform a specific task. They help organize code into reusable, testable units. Every function in Swift follows a consistent structure that makes code predictable and easy to read.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="Functions.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h3>Function Components</h3>
      <p>
        Understanding each part of a function declaration helps you write clear, maintainable code:
      </p>
      <ul>
        <li><strong>Function name:</strong> Describes what the function does. Use verbs like <code>calculate</code>, <code>process</code>, or <code>validate</code>.</li>
        <li><strong>Parameters:</strong> Input values the function needs. Each parameter has a name and type.</li>
        <li><strong>Return type:</strong> The type of value the function produces. Use <code>Void</code> or omit for functions that don't return anything.</li>
        <li><strong>Function body:</strong> The code that executes when the function is called, enclosed in curly braces.</li>
      </ul>

      <ComparisonTable
        title="Function Return Types Comparison"
        headers={["Return Type", "Syntax", "When to Use", "Example"]}
        rows={[
          {
            feature: "Single Value",
            option1: (
              <>
                <code className="text-accent">{"->"} Type</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Returns one value of a specific type
                </span>
              </>
            ),
            option2: (
              <>
                Simple calculations, transformations, or data retrieval
              </>
            ),
            option3: (
              <>
                <code>func add(a: Int, b: Int) {"->"} Int</code>
              </>
            ),
          },
          {
            feature: "Multiple Values",
            option1: (
              <>
                <code className="text-accent">{"->"} (Type1, Type2)</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Returns a tuple with labeled or unnamed values
                </span>
              </>
            ),
            option2: (
              <>
                When you need to return related values together
              </>
            ),
            option3: (
              <>
                <code>func minMax() {"->"} (min: Int, max: Int)</code>
              </>
            ),
          },
          {
            feature: "No Return",
            option1: (
              <>
                <code className="text-accent">{"->"} Void</code> or omitted
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Function performs an action but returns nothing
                </span>
              </>
            ),
            option2: (
              <>
                Side effects like printing, saving, or modifying state
              </>
            ),
            option3: (
              <>
                <code>func printMessage()</code>
              </>
            ),
          },
          {
            feature: "Optional Return",
            option1: (
              <>
                <code className="text-accent">{"->"} Type?</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  May return a value or nil
                </span>
              </>
            ),
            option2: (
              <>
                When the operation might fail or not find a value
              </>
            ),
            option3: (
              <>
                <code>func findUser(id: Int) {"->"} User?</code>
              </>
            ),
          },
        ]}
        caption="Choose the appropriate return type based on what your function needs to communicate to its caller."
      />

      <h2>Advanced Function Features</h2>

      <p>
        Swift provides several advanced features that make functions more flexible and expressive. These features help you write code that's both powerful and easy to use.
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="AdvancedFunctions.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Parameter Types Comparison"
        headers={["Feature", "Syntax", "Use Case", "Example"]}
        rows={[
          {
            feature: "External Names",
            option1: (
              <>
                <code className="text-accent">func greet(person: String, from hometown: String)</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Different names for caller and function body
                </span>
              </>
            ),
            option2: (
              <>
                Make function calls more readable and self-documenting
              </>
            ),
            option3: (
              <>
                <code>greet(person: "Alice", from: "NYC")</code>
              </>
            ),
          },
          {
            feature: "Omitted Labels",
            option1: (
              <>
                <code className="text-accent">func add(_ a: Int, _ b: Int)</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Use underscore to omit external name
                </span>
              </>
            ),
            option2: (
              <>
                When parameter names are obvious from context
              </>
            ),
            option3: (
              <>
                <code>add(5, 3)</code> instead of <code>add(a: 5, b: 3)</code>
              </>
            ),
          },
          {
            feature: "Default Values",
            option1: (
              <>
                <code className="text-accent">func greet(name: String, greeting: String = "Hello")</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Provide default value with = operator
                </span>
              </>
            ),
            option2: (
              <>
                Make parameters optional with sensible defaults
              </>
            ),
            option3: (
              <>
                <code>greet(name: "Alice")</code> or <code>greet(name: "Bob", greeting: "Hi")</code>
              </>
            ),
          },
          {
            feature: "Variadic",
            option1: (
              <>
                <code className="text-accent">func sum(_ numbers: Int...)</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Accept zero or more values using ...
                </span>
              </>
            ),
            option2: (
              <>
                When you need flexible number of arguments
              </>
            ),
            option3: (
              <>
                <code>sum(1, 2, 3, 4, 5)</code>
              </>
            ),
          },
        ]}
        caption="Swift's parameter system provides flexibility while maintaining clarity. Choose the right approach based on your function's needs."
      />

      <Callout kind="info" title="Parameter Order Matters">
        Parameters with default values must come after parameters without defaults. Variadic parameters must be the last parameter in the function signature.
      </Callout>

      <h2>Closures</h2>

      <p>
        Closures are self-contained blocks of functionality that can be passed around and used in your code. Think of them as functions without names that can capture values from their surrounding context. They're essential for callbacks, functional programming patterns, and asynchronous operations.
      </p>

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="Closures.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Closure Syntax Comparison"
        headers={["Syntax Style", "Example", "When to Use", "Readability"]}
        rows={[
          {
            feature: "Full Syntax",
            option1: (
              <>
                <code className="text-accent text-xs">
                  {"{(number: Int) -> Int in return number * 2}"}
                </code>
              </>
            ),
            option2: (
              <>
                Complex closures or when types aren't clear
              </>
            ),
            option3: (
              <>
                Most explicit, easiest to understand
              </>
            ),
          },
          {
            feature: "Inferred Types",
            option1: (
              <>
                <code className="text-accent text-xs">
                  {"{number in number * 2}"}
                </code>
              </>
            ),
            option2: (
              <>
                Simple closures with clear context
              </>
            ),
            option3: (
              <>
                Good balance of clarity and brevity
              </>
            ),
          },
          {
            feature: "Shorthand Arguments",
            option1: (
              <>
                <code className="text-accent text-xs">
                  {"{$0 * $0}"}
                </code>
              </>
            ),
            option2: (
              <>
                Very simple, single-expression closures
              </>
            ),
            option3: (
              <>
                Most concise, but less self-documenting
              </>
            ),
          },
          {
            feature: "Trailing Closure",
            option1: (
              <>
                <code className="text-accent text-xs">
                  {"numbers.map {$0 * 2}"}
                </code>
              </>
            ),
            option2: (
              <>
                When closure is the last parameter
              </>
            ),
            option3: (
              <>
                Clean, readable, Swift-idiomatic
              </>
            ),
          },
        ]}
        caption="Choose closure syntax based on complexity and context. Start with full syntax for clarity, then simplify as you become comfortable."
      />

      <h3>Closure Capture Lists</h3>
      <p>
        Capture lists control how closures capture values from their surrounding context. This is crucial for memory management and avoiding retain cycles.
      </p>

      <CompareBlock
        badTitle="Strong Capture (Retain Cycle Risk)"
        goodTitle="Weak Capture (Safe)"
        bad={
          <>
            <code className="text-xs block mb-2">
              class ViewController {"{"}
              <br />
              {"  "}var closure: (() {"->"} Void)?
              <br />
              {"  "}func setup() {"{"}
              <br />
              {"    "}closure = {"{"} self.doSomething() {"}"}
              <br />
              {"  "}{"}"}
              <br />
              {"}"}
            </code>
            <p className="text-xs mt-2">
              This creates a retain cycle: ViewController holds closure, closure holds self.
            </p>
          </>
        }
        good={
          <>
            <code className="text-xs block mb-2">
              class ViewController {"{"}
              <br />
              {"  "}var closure: (() {"->"} Void)?
              <br />
              {"  "}func setup() {"{"}
              <br />
              {"    "}closure = {"{"} [weak self] in
              <br />
              {"      "}self?.doSomething()
              <br />
              {"    "}{"}"}
              <br />
              {"  "}{"}"}
              <br />
              {"}"}
            </code>
            <p className="text-xs mt-2">
              Weak capture breaks the cycle. Use <code>[unowned self]</code> if self is guaranteed to exist.
            </p>
          </>
        }
      />

      <ComparisonTable
        title="Capture List Types"
        headers={["Capture Type", "Syntax", "Behavior", "When to Use"]}
        rows={[
          {
            feature: "Strong (Default)",
            option1: (
              <>
                <code className="text-accent">{"{"} self.doSomething() {"}"}</code>
              </>
            ),
            option2: (
              <>
                Creates strong reference, can cause retain cycles
              </>
            ),
            option3: (
              <>
                When closure lifetime is shorter than captured object
              </>
            ),
          },
          {
            feature: "Weak",
            option1: (
              <>
                <code className="text-accent">{"{"} [weak self] in self?.doSomething() {"}"}</code>
              </>
            ),
            option2: (
              <>
                Creates weak reference, becomes nil if object deallocated
              </>
            ),
            option3: (
              <>
                Most common for avoiding retain cycles with self
              </>
            ),
          },
          {
            feature: "Unowned",
            option1: (
              <>
                <code className="text-accent">{"{"} [unowned self] in self.doSomething() {"}"}</code>
              </>
            ),
            option2: (
              <>
                Assumes object exists, crashes if deallocated
              </>
            ),
            option3: (
              <>
                When you're certain the object outlives the closure
              </>
            ),
          },
        ]}
        caption="Always use weak or unowned when capturing self in closures to prevent retain cycles. Weak is safer and more common."
      />

      <h2>Enumerations</h2>

      <p>
        Enumerations (enums) define a common type for a group of related values and enable you to work with those values in a type-safe way. They're more powerful than simple constants and are one of Swift's most elegant features for modeling data.
      </p>

      <DocCBlock
        code={codeExample4}
        lang="swift"
        filename="Enumerations.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Enum Types Comparison"
        headers={["Enum Type", "Syntax", "Use Case", "Example"]}
        rows={[
          {
            feature: "Basic Enum",
            option1: (
              <>
                <code className="text-accent">enum Direction {"{"} case north, south {"}"}</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Simple cases with no additional data
                </span>
              </>
            ),
            option2: (
              <>
                Fixed set of related constants
              </>
            ),
            option3: (
              <>
                Compass directions, status states, error types
              </>
            ),
          },
          {
            feature: "Raw Values",
            option1: (
              <>
                <code className="text-accent">enum Planet: Int {"{"} case earth = 3 {"}"}</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Each case has a predefined value
                </span>
              </>
            ),
            option2: (
              <>
                When you need to convert to/from primitive types
              </>
            ),
            option3: (
              <>
                API responses, database values, file types
              </>
            ),
          },
          {
            feature: "Associated Values",
            option1: (
              <>
                <code className="text-accent">enum Result {"{"} case success(Data), failure(Error) {"}"}</code>
                <br />
                <span className="text-fg-subtle text-xs mt-1 block">
                  Cases can carry additional data
                </span>
              </>
            ),
            option2: (
              <>
                When cases need different associated data
              </>
            ),
            option3: (
              <>
                Network responses, parsing results, state machines
              </>
            ),
          },
        ]}
        caption="Choose the enum type that best fits your data model. Associated values make enums incredibly powerful for modeling complex states."
      />

      <FlowChart
        title="When to Use Enums vs Other Types"
        caption="Decision tree for choosing between enums, structs, and classes"
        width={750}
        height={500}
        nodes={[
          { id: "start", label: "Need to represent related values?", type: "start", position: { x: 375, y: 50 } },
          { id: "fixed", label: "Fixed set of values?", type: "decision", position: { x: 375, y: 150 } },
          { id: "data", label: "Need associated data?", type: "decision", position: { x: 375, y: 280 } },
          { id: "enum-basic", label: "Use Basic Enum", type: "end", position: { x: 150, y: 400 } },
          { id: "enum-raw", label: "Use Enum with Raw Values", type: "end", position: { x: 375, y: 400 } },
          { id: "enum-associated", label: "Use Enum with Associated Values", type: "end", position: { x: 600, y: 400 } },
          { id: "struct", label: "Use Struct", type: "end", position: { x: 150, y: 450 } },
          { id: "class", label: "Use Class", type: "end", position: { x: 600, y: 450 } },
        ]}
        edges={[
          { from: "start", to: "fixed" },
          { from: "fixed", to: "data", label: "Yes" },
          { from: "data", to: "enum-basic", label: "No" },
          { from: "data", to: "enum-raw", label: "Same type" },
          { from: "data", to: "enum-associated", label: "Different types" },
          { from: "fixed", to: "struct", label: "No" },
        ]}
      />

      <h3>Real-World Enum Examples</h3>
      <p>
        Enums are used extensively in Swift and iOS development. Here are common patterns you'll encounter:
      </p>

      <ul>
        <li><strong>Network Results:</strong> <code>enum Result {"{"} case success(Data), failure(Error) {"}"}</code></li>
        <li><strong>View States:</strong> <code>enum ViewState {"{"} case loading, loaded([Item]), error(String) {"}"}</code></li>
        <li><strong>User Actions:</strong> <code>enum Action {"{"} case tap, swipe(Direction), longPress {"}"}</code></li>
        <li><strong>API Status:</strong> <code>enum HTTPStatus: Int {"{"} case ok = 200, notFound = 404 {"}"}</code></li>
      </ul>

      <Callout kind="info" title="Enum Best Practices">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use enums when you have a fixed set of related values—they provide compile-time safety</li>
          <li>Associated values are perfect for modeling state machines and option types</li>
          <li>Raw values are useful when interfacing with external systems (APIs, databases)</li>
          <li>Enums with associated values can replace many class hierarchies, providing better performance</li>
          <li>Always make enums exhaustive in switch statements, or include a default case</li>
        </ul>
      </Callout>

      <KeyTakeaways
        items={[
          "Functions are defined with func keyword and can have parameters, return types, and default values.",
          "Closures are self-contained blocks of functionality that can capture values from their surrounding context.",
          "Enumerations provide type-safe way to work with groups of related values.",
          "Enums can have raw values (Int, String, etc.) or associated values (any type).",
          "Swift's closure syntax is flexible, supporting full syntax, shorthand, and trailing closures.",
        ]}
        mentalModel="Think of functions as reusable code blocks, closures as portable code snippets that can capture their environment, and enums as type-safe constants that can carry additional data. Together, they enable powerful, expressive, and safe code organization."
      />

      <PageNavigation
        previous={nav?.previous ? { title: nav.previous.title, href: nav.previous.href } : undefined}
        next={nav?.next ? { title: nav.next.title, href: nav.next.href } : undefined}
      />
    </>
  );
}

