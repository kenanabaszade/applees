import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { FlowChart } from "@/components/docs/FlowChart";
import { findCurrentPage } from "@/lib/nav-utils";

export default async function SwiftDataTypes() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/swift-data-types");
  const codeExample1 = `/// Demonstrates Swift's primitive data types.
///
/// Swift provides a rich set of built-in types for working with
/// different kinds of data, from text to numbers to boolean values.
///
/// ## String and Character
/// Text types for working with sequences of characters.
let greeting: String = "Hello, Swift!"
let multiline = """
    This is a
    multiline string
    """

/// Single character type.
let letter: Character = "A"

/// ## Integer Types
/// Whole numbers with various sizes and signed/unsigned variants.
let age: Int = 25
let largeNumber: Int64 = 9_223_372_036_854_775_807

/// ## Floating-Point Types
/// Numbers with fractional components.
///
/// > Note: Double is preferred over Float for most use cases.
let pi: Double = 3.14159265359  // 64-bit, preferred
let e: Float = 2.71828          // 32-bit

/// ## Boolean
/// Logical true/false values.
let isActive: Bool = true
let isComplete: Bool = false

/// ## Tuples
/// Group multiple values into a single compound value.
///
/// - Parameter coordinates: A tuple with labeled x and y coordinates
/// - Parameter person: A tuple with name and age
let coordinates: (x: Int, y: Int) = (10, 20)
let person: (name: String, age: Int) = ("Alice", 30)
print(person.name)  // "Alice"
print(person.age)   // 30`;

  const codeExample2 = `/// Demonstrates working with arrays in Swift.
///
/// Arrays are ordered collections that store values of the same type.
/// They provide efficient access by index and support common operations
/// like appending, inserting, and removing elements.
///
/// ## Creating Arrays
/// Arrays can be created with explicit types or type inference.
var numbers: [Int] = [1, 2, 3, 4, 5]
var names = ["Alice", "Bob", "Charlie"]  // Type inferred

/// ## Accessing Elements
/// Access elements by index or use properties like \`last\`.
///
/// - Returns: The element at the specified index or an optional value
let first = numbers[0]        // 1
let last = numbers.last       // Optional(5)

/// ## Modifying Arrays
/// Arrays are mutable when declared with \`var\`.
///
/// - Parameter value: The value to append or insert
/// - Parameter index: The position where to insert
numbers.append(6)              // [1, 2, 3, 4, 5, 6]
numbers.insert(0, at: 0)      // [0, 1, 2, 3, 4, 5, 6]
numbers.remove(at: 0)          // [1, 2, 3, 4, 5, 6]

/// ## Iterating
/// Use for-in loops to iterate over array elements.
for number in numbers {
    print(number)
}`;

  const codeExample3 = `/// Demonstrates working with sets in Swift.
///
/// Sets store unordered collections of unique values. They're ideal
/// when you need to ensure uniqueness and don't care about order.
///
/// ## Creating Sets
/// Sets require explicit type annotation or type inference from context.
var uniqueNumbers: Set<Int> = [1, 2, 3, 4, 5]
var colors: Set<String> = ["red", "green", "blue"]

/// ## Adding Elements
/// Insert new elements into a set.
///
/// - Parameter value: The value to insert
/// - Returns: A tuple indicating if the value was inserted and the inserted value
///
/// > Note: Inserting a duplicate value won't change the set.
uniqueNumbers.insert(6)        // May or may not add if already exists
colors.insert("yellow")

/// ## Set Operations
/// Perform mathematical set operations like union, intersection, and difference.
///
/// - Parameter set1: The first set
/// - Parameter set2: The second set
/// - Returns: A new set with the result of the operation
let set1: Set<Int> = [1, 2, 3, 4, 5]
let set2: Set<Int> = [4, 5, 6, 7, 8]

let union = set1.union(set2)           // [1, 2, 3, 4, 5, 6, 7, 8]
let intersection = set1.intersection(set2)  // [4, 5]
let difference = set1.subtracting(set2)      // [1, 2, 3]`;

  const codeExample4 = `/// Demonstrates working with dictionaries in Swift.
///
/// Dictionaries store key-value pairs where each key must be unique.
/// They provide efficient lookup by key and are ideal for mapping
/// relationships between values.
///
/// ## Creating Dictionaries
/// Dictionaries can be created with explicit types or type inference.
var scores: [String: Int] = [
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92
]

/// ## Accessing Values
/// Access values by key, which returns an optional value.
///
/// - Parameter key: The key to look up
/// - Returns: An optional value if the key exists, nil otherwise
let aliceScore = scores["Alice"]  // Optional(95)
let daveScore = scores["Dave"]    // nil

/// ## Modifying Dictionaries
/// Add, update, or remove key-value pairs.
///
/// - Parameter key: The key to set or remove
/// - Parameter value: The value to associate with the key
scores["Dave"] = 88               // Add new entry
scores["Alice"] = 96              // Update existing entry
scores.removeValue(forKey: "Bob")  // Remove entry

/// ## Iterating
/// Iterate over key-value pairs using for-in loops.
for (name, score) in scores {
    print("\\(name): \\(score)")
}

/// ## Default Values
/// Provide a default value when accessing a key that might not exist.
///
/// - Parameter key: The key to look up
/// - Parameter default: The value to return if the key doesn't exist
/// - Returns: The value for the key or the default value
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

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="PrimitiveTypes.swift"
        showLineNumbers={true}
        showDocumentation={true}
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

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="Arrays.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <Callout kind="info" title="Array Performance">
        Arrays in Swift are value types, meaning they're copied when assigned or passed to functions. However, Swift uses copy-on-write optimization, so copies are only made when necessary.
      </Callout>

      <h3>Sets</h3>

      <p>
        Sets store unordered collections of unique values. They're ideal when you need to ensure uniqueness or perform set operations like union, intersection, and subtraction.
      </p>

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="Sets.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h3>Dictionaries</h3>

      <p>
        Dictionaries store associations between keys and values. Each value is associated with a unique key, which you use to retrieve the value.
      </p>

      <DocCBlock
        code={codeExample4}
        lang="swift"
        filename="Dictionaries.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <Callout kind="warning" title="Dictionary Access">
        Dictionary subscripting returns an optional value because the key might not exist. Always handle the optional, or use the <code>default</code> parameter for a fallback value.
      </Callout>

      <h2>Choosing the Right Collection</h2>

      <p>
        Swift provides three main collection types, each optimized for different use cases. Understanding their characteristics helps you choose the right tool for the job.
      </p>

      <ComparisonTable
        title="Collection Types Comparison"
        headers={["Feature", "Array", "Set", "Dictionary"]}
        rows={[
          {
            feature: "Order",
            option1: (
              <>
                <span className="text-fg">Ordered</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Maintains insertion order
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Unordered</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  No guaranteed order
                </span>
              </>
            ),
            option3: (
              <>
                <span className="text-fg-muted">Unordered</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Keys are unordered
                </span>
              </>
            ),
          },
          {
            feature: "Duplicates",
            option1: (
              <>
                <span className="text-fg">Allowed</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Can have duplicate values
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg">Not allowed</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Each value is unique
                </span>
              </>
            ),
            option3: (
              <>
                <span className="text-fg">Unique keys</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Keys must be unique, values can duplicate
                </span>
              </>
            ),
          },
          {
            feature: "Access",
            option1: (
              <>
                <span className="text-fg">By index</span>
                <br />
                <code className="text-xs text-accent">array[0]</code>
              </>
            ),
            option2: (
              <>
                <span className="text-fg">By value</span>
                <br />
                <code className="text-xs text-accent">set.contains(value)</code>
              </>
            ),
            option3: (
              <>
                <span className="text-fg">By key</span>
                <br />
                <code className="text-xs text-accent">dict["key"]</code>
              </>
            ),
          },
          {
            feature: "Performance",
            option1: (
              <>
                <span className="text-fg">O(1) indexed access</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  O(n) for search
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg">O(1) lookup average</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Hash-based, very fast
                </span>
              </>
            ),
            option3: (
              <>
                <span className="text-fg">O(1) key lookup</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Hash-based, very fast
                </span>
              </>
            ),
          },
          {
            feature: "Use Cases",
            option1: (
              <>
                Lists, sequences, ordered data
                <br />
                <span className="text-fg-subtle text-xs">
                  Shopping cart, timeline, playlist
                </span>
              </>
            ),
            option2: (
              <>
                Unique items, membership testing
                <br />
                <span className="text-fg-subtle text-xs">
                  Tags, visited items, unique IDs
                </span>
              </>
            ),
            option3: (
              <>
                Key-value mappings, lookups
                <br />
                <span className="text-fg-subtle text-xs">
                  User profiles, settings, caches
                </span>
              </>
            ),
          },
        ]}
        caption="Choose arrays for ordered sequences, sets for unique collections, and dictionaries for key-value relationships. Each is optimized for its specific use case."
      />

      <FlowChart
        title="Choosing the Right Collection Type"
        caption="Decision tree to help you select the appropriate collection for your data"
        width={700}
        height={550}
        nodes={[
          { id: "start", label: "Need a collection?", type: "start", position: { x: 350, y: 50 } },
          { id: "ordered", label: "Need order?", type: "decision", position: { x: 350, y: 150 } },
          { id: "key-value", label: "Key-value pairs?", type: "decision", position: { x: 350, y: 280 } },
          { id: "unique", label: "Need uniqueness?", type: "decision", position: { x: 350, y: 410 } },
          { id: "array", label: "Use Array", type: "end", position: { x: 150, y: 480 } },
          { id: "dict", label: "Use Dictionary", type: "end", position: { x: 350, y: 480 } },
          { id: "set", label: "Use Set", type: "end", position: { x: 550, y: 480 } },
        ]}
        edges={[
          { from: "start", to: "ordered" },
          { from: "ordered", to: "key-value", label: "No" },
          { from: "ordered", to: "array", label: "Yes" },
          { from: "key-value", to: "dict", label: "Yes" },
          { from: "key-value", to: "unique", label: "No" },
          { from: "unique", to: "set", label: "Yes" },
          { from: "unique", to: "dict", label: "No" },
        ]}
      />

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

      <PageNavigation
        previous={nav?.previous ? { title: nav.previous.title, href: nav.previous.href } : undefined}
        next={nav?.next ? { title: nav.next.title, href: nav.next.href } : undefined}
      />
    </>
  );
}

