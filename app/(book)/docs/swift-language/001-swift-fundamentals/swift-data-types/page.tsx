import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";

export default async function SwiftDataTypes() {
  const codeExample1 = `// String - sequence of characters
let greeting: String = "Hello, Swift!"
let multiline = """
    This is a
    multiline string
    """

// Character - single character
let letter: Character = "A"

// Integer types
let age: Int = 25
let largeNumber: Int64 = 9_223_372_036_854_775_807

// Floating-point types
let pi: Double = 3.14159265359  // 64-bit, preferred
let e: Float = 2.71828          // 32-bit

// Boolean
let isActive: Bool = true
let isComplete: Bool = false

// Tuples - group multiple values
let coordinates: (x: Int, y: Int) = (10, 20)
let person: (name: String, age: Int) = ("Alice", 30)
print(person.name)  // "Alice"
print(person.age)   // 30`;

  const codeExample2 = `// Arrays - ordered collection of values
var numbers: [Int] = [1, 2, 3, 4, 5]
var names = ["Alice", "Bob", "Charlie"]  // Type inferred

// Accessing elements
let first = numbers[0]        // 1
let last = numbers.last       // Optional(5)

// Modifying arrays
numbers.append(6)              // [1, 2, 3, 4, 5, 6]
numbers.insert(0, at: 0)      // [0, 1, 2, 3, 4, 5, 6]
numbers.remove(at: 0)          // [1, 2, 3, 4, 5, 6]

// Iterating
for number in numbers {
    print(number)
}`;

  const codeExample3 = `// Sets - unordered collection of unique values
var uniqueNumbers: Set<Int> = [1, 2, 3, 4, 5]
var colors: Set<String> = ["red", "green", "blue"]

// Adding elements
uniqueNumbers.insert(6)        // May or may not add if already exists
colors.insert("yellow")

// Set operations
let set1: Set<Int> = [1, 2, 3, 4, 5]
let set2: Set<Int> = [4, 5, 6, 7, 8]

let union = set1.union(set2)           // [1, 2, 3, 4, 5, 6, 7, 8]
let intersection = set1.intersection(set2)  // [4, 5]
let difference = set1.subtracting(set2)      // [1, 2, 3]`;

  const codeExample4 = `// Dictionaries - key-value pairs
var scores: [String: Int] = [
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92
]

// Accessing values
let aliceScore = scores["Alice"]  // Optional(95)
let daveScore = scores["Dave"]    // nil

// Modifying dictionaries
scores["Dave"] = 88               // Add new entry
scores["Alice"] = 96              // Update existing entry
scores.removeValue(forKey: "Bob")  // Remove entry

// Iterating
for (name, score) in scores {
    print("\\(name): \\(score)")
}

// Dictionary with default value
let score = scores["Eve", default: 0]  // Returns 0 if key doesn't exist`;

  return (
    <>
      <DocHeader
        title="Swift Data Types"
        subtitle="Explore Swift's rich type system: primitive types (String, Character, Int, Double, Tuples) and collections (Arrays, Sets, Dictionaries)."
        chapter="001"
        readingTime="~10 min"
        progress={0.4}
      />

      <Callout kind="note" title="Type System">
        Swift's type system is designed to be both powerful and safe. Understanding the different data types and when to use them is fundamental to writing effective Swift code.
      </Callout>

      <h2>Primitive Types</h2>

      <p>
        Swift provides several built-in types for representing basic values:
      </p>

      <CodeBlock
        code={codeExample1}
        lang="swift"
        filename="PrimitiveTypes.swift"
        showLineNumbers={true}
      />

      <h3>String and Character</h3>
      <p>
        <strong>String</strong> represents a sequence of characters and is Swift's primary type for text. <strong>Character</strong> represents a single Unicode character. Strings in Swift are fully Unicode-compliant and support multiline strings.
      </p>

      <h3>Numeric Types</h3>
      <p>
        Swift provides several integer types (<code>Int</code>, <code>Int8</code>, <code>Int16</code>, <code>Int32</code>, <code>Int64</code>) and floating-point types (<code>Float</code>, <code>Double</code>). In most cases, use <code>Int</code> for integers and <code>Double</code> for floating-point numbers.
      </p>

      <h3>Boolean</h3>
      <p>
        The <code>Bool</code> type represents logical values: <code>true</code> or <code>false</code>.
      </p>

      <h3>Tuples</h3>
      <p>
        Tuples group multiple values into a single compound value. They're useful for returning multiple values from functions or grouping related data temporarily.
      </p>

      <h2>Collections</h2>

      <p>
        Swift provides three primary collection types, each optimized for different use cases:
      </p>

      <h3>Arrays</h3>

      <p>
        Arrays store ordered collections of values of the same type. They're zero-indexed and allow duplicate values.
      </p>

      <CodeBlock
        code={codeExample2}
        lang="swift"
        filename="Arrays.swift"
        showLineNumbers={true}
      />

      <Callout kind="info" title="Array Performance">
        Arrays in Swift are value types, meaning they're copied when assigned or passed to functions. However, Swift uses copy-on-write optimization, so copies are only made when necessary.
      </Callout>

      <h3>Sets</h3>

      <p>
        Sets store unordered collections of unique values. They're ideal when you need to ensure uniqueness or perform set operations like union, intersection, and subtraction.
      </p>

      <CodeBlock
        code={codeExample3}
        lang="swift"
        filename="Sets.swift"
        showLineNumbers={true}
      />

      <h3>Dictionaries</h3>

      <p>
        Dictionaries store associations between keys and values. Each value is associated with a unique key, which you use to retrieve the value.
      </p>

      <CodeBlock
        code={codeExample4}
        lang="swift"
        filename="Dictionaries.swift"
        showLineNumbers={true}
      />

      <Callout kind="warning" title="Dictionary Access">
        Dictionary subscripting returns an optional value because the key might not exist. Always handle the optional, or use the <code>default</code> parameter for a fallback value.
      </Callout>

      <h2>Choosing the Right Collection</h2>

      <ul>
        <li><strong>Array:</strong> Use when order matters and duplicates are allowed</li>
        <li><strong>Set:</strong> Use when uniqueness matters and order doesn't</li>
        <li><strong>Dictionary:</strong> Use when you need to associate values with unique keys</li>
      </ul>

      <KeyTakeaways
        items={[
          "Swift provides String, Character, Int, Double, Float, Bool, and Tuple types for basic values.",
          "Arrays are ordered collections, ideal when order and duplicates matter.",
          "Sets are unordered collections of unique values, perfect for uniqueness checks and set operations.",
          "Dictionaries store key-value pairs, providing fast lookups by key.",
          "All collection types in Swift are generic and type-safe, preventing type mismatches at compile time.",
        ]}
        mentalModel="Think of Arrays as numbered lists, Sets as unique item bags, and Dictionaries as labeled containers. Each collection type is optimized for different access patterns and use cases."
      />
    </>
  );
}

