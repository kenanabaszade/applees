import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";

export default async function FunctionsAndEnums() {
  const codeExample1 = `// Basic function
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

let message = greet(name: "Alice")
print(message)  // "Hello, Alice!"

// Function with multiple parameters
func add(a: Int, b: Int) -> Int {
    return a + b
}

let sum = add(a: 5, b: 3)  // 8

// Function with no return value
func printGreeting(name: String) {
    print("Hello, \\(name)!")
}

// Function with multiple return values (using tuple)
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

  const codeExample2 = `// Function with external and internal parameter names
func greet(person: String, from hometown: String) -> String {
    return "Hello \\(person)! Glad you could visit from \\(hometown)."
}

let greeting = greet(person: "Bill", from: "Cupertino")

// Omitting argument labels
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // firstParameterName and secondParameterName refer to the argument values
}

someFunction(1, secondParameterName: 2)

// Default parameter values
func greet(name: String, greeting: String = "Hello") -> String {
    return "\\(greeting), \\(name)!"
}

greet(name: "Alice")              // "Hello, Alice!"
greet(name: "Bob", greeting: "Hi")  // "Hi, Bob!"

// Variadic parameters
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}

arithmeticMean(1, 2, 3, 4, 5)  // 3.0`;

  const codeExample3 = `// Closure syntax
let numbers = [1, 2, 3, 4, 5]

// Full closure syntax
let doubled = numbers.map({ (number: Int) -> Int in
    return number * 2
})

// Shorthand closure syntax
let tripled = numbers.map({ number in number * 3 })

// Trailing closure syntax
let squared = numbers.map { $0 * $0 }

// Closures as function parameters
func operate(on numbers: [Int], operation: (Int) -> Int) -> [Int] {
    return numbers.map(operation)
}

let result = operate(on: [1, 2, 3]) { $0 * 10 }

// Capturing values
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

  const codeExample4 = `// Basic enumeration
enum CompassPoint {
    case north
    case south
    case east
    case west
}

var direction = CompassPoint.north
direction = .south  // Can use shorthand when type is known

// Switch with enum
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

// Enum with raw values
enum Planet: Int {
    case mercury = 1
    case venus = 2
    case earth = 3
    case mars = 4
}

let earth = Planet.earth
print(earth.rawValue)  // 3

// Enum with associated values
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
        Functions are self-contained chunks of code that perform a specific task. They're defined using the <code>func</code> keyword.
      </p>

      <CodeBlock
        code={codeExample1}
        lang="swift"
        filename="Functions.swift"
        showLineNumbers={true}
      />

      <h3>Function Components</h3>
      <ul>
        <li><strong>Function name:</strong> Identifies the function</li>
        <li><strong>Parameters:</strong> Input values the function accepts</li>
        <li><strong>Return type:</strong> The type of value the function returns (use <code>Void</code> or omit for no return)</li>
        <li><strong>Function body:</strong> The code that executes when the function is called</li>
      </ul>

      <h2>Advanced Function Features</h2>

      <CodeBlock
        code={codeExample2}
        lang="swift"
        filename="AdvancedFunctions.swift"
        showLineNumbers={true}
      />

      <h3>Parameter Names</h3>
      <p>
        Swift functions can have both <strong>external</strong> parameter names (used when calling the function) and <strong>internal</strong> parameter names (used within the function body). Use <code>_</code> to omit the external name.
      </p>

      <h3>Default Parameters</h3>
      <p>
        Functions can have default parameter values, making some parameters optional when calling the function.
      </p>

      <h3>Variadic Parameters</h3>
      <p>
        A variadic parameter accepts zero or more values of a specified type. Use <code>...</code> after the parameter type.
      </p>

      <h2>Closures</h2>

      <p>
        Closures are self-contained blocks of functionality that can be passed around and used in your code. They're similar to lambdas in other languages.
      </p>

      <CodeBlock
        code={codeExample3}
        lang="swift"
        filename="Closures.swift"
        showLineNumbers={true}
      />

      <h3>Closure Syntax</h3>
      <p>
        Closures can be written in several forms:
      </p>
      <ul>
        <li><strong>Full syntax:</strong> Explicit parameter types and return type</li>
        <li><strong>Inferred types:</strong> Swift infers types from context</li>
        <li><strong>Shorthand argument names:</strong> Use <code>$0</code>, <code>$1</code>, etc.</li>
        <li><strong>Trailing closures:</strong> When a closure is the last parameter, it can be written outside parentheses</li>
      </ul>

      <h3>Capturing Values</h3>
      <p>
        Closures can capture and store references to constants and variables from the surrounding context. This allows closures to access and modify those values even after the original scope has ended.
      </p>

      <Callout kind="warning" title="Closure Capture">
        Be careful with closures capturing <code>self</code> strongly, as this can create retain cycles. Use <code>[weak self]</code> or <code>[unowned self]</code> when appropriate.
      </Callout>

      <h2>Enumerations</h2>

      <p>
        Enumerations (enums) define a common type for a group of related values and enable you to work with those values in a type-safe way.
      </p>

      <CodeBlock
        code={codeExample4}
        lang="swift"
        filename="Enumerations.swift"
        showLineNumbers={true}
      />

      <h3>Basic Enumerations</h3>
      <p>
        Basic enums define a set of related cases. Each case is a distinct value of the enum type.
      </p>

      <h3>Raw Values</h3>
      <p>
        Enums can have raw values (strings, characters, or any integer or floating-point number type). Each case gets a unique raw value.
      </p>

      <h3>Associated Values</h3>
      <p>
        Enums can store associated values of any type alongside each case. This allows you to attach additional information to enum cases, making them more flexible than simple constants.
      </p>

      <Callout kind="info" title="Enum Best Practices">
        Use enums when you have a fixed set of related values. They provide type safety and make your code more expressive. Associated values are particularly powerful for modeling state machines and option types.
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
    </>
  );
}

