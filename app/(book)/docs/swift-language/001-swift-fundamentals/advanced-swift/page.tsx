import { DocHeader } from "@/components/docs/DocHeader";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { FlowChart } from "@/components/docs/FlowChart";
import { CompareBlock } from "@/components/docs/CompareBlock";
import { findCurrentPage } from "@/lib/nav-utils";

export default async function AdvancedSwift() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/advanced-swift");

  const codeExample1 = `/// Demonstrates higher-order functions in Swift.
///
/// Higher-order functions are functions that take other functions as parameters
/// or return functions. They enable functional programming patterns and make
/// code more concise and expressive.
///
/// ## Map
/// Transforms each element in a collection.
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }  // [2, 4, 6, 8, 10]

/// ## Filter
/// Selects elements that meet a condition.
let evens = numbers.filter { $0 % 2 == 0 }  // [2, 4]

/// ## Reduce
/// Combines all elements into a single value.
let sum = numbers.reduce(0) { $0 + $1 }  // 15

/// ## CompactMap
/// Maps and removes nil values.
let strings = ["1", "2", "three", "4"]
let numbers = strings.compactMap { Int($0) }  // [1, 2, 4]

/// ## FlatMap
/// Flattens nested collections.
let nested = [[1, 2], [3, 4], [5]]
let flat = nested.flatMap { $0 }  // [1, 2, 3, 4, 5]`;

  const codeExample2 = `/// Demonstrates error handling in Swift.
///
/// Swift provides a type-safe error handling system using the \`Error\` protocol,
/// \`throw\`, \`try\`, \`catch\`, and \`do-catch\` statements.
///
/// ## Defining Errors
/// Create custom error types conforming to the Error protocol.
enum NetworkError: Error {
    case invalidURL
    case noConnection
    case serverError(Int)
}

/// ## Throwing Errors
/// Functions that can throw errors are marked with \`throws\`.
func fetchData(from url: String) throws -> Data {
    guard !url.isEmpty else {
        throw NetworkError.invalidURL
    }
    // Simulate network call
    if url == "bad" {
        throw NetworkError.noConnection
    }
    return Data()
}

/// ## Handling Errors
/// Use do-catch to handle errors.
do {
    let data = try fetchData(from: "https://example.com")
    print("Success: \\(data)")
} catch NetworkError.invalidURL {
    print("Invalid URL")
} catch NetworkError.noConnection {
    print("No connection")
} catch {
    print("Unknown error: \\(error)")
}

/// ## Optional Try
/// Convert errors to optionals.
if let data = try? fetchData(from: "https://example.com") {
    print("Got data")
}

/// ## Forced Try
/// Crash if error occurs (use sparingly).
let data = try! fetchData(from: "https://example.com")`;

  const codeExample3 = `/// Demonstrates access control in Swift.
///
/// Access control restricts access to parts of your code from code in other
/// source files and modules. This enables encapsulation and information hiding.
///
/// ## Access Levels
/// Swift provides five access levels (from most restrictive to least):
///
/// - \`private\`: Accessible only within the same file
/// - \`fileprivate\`: Accessible within the same source file
/// - \`internal\`: Accessible within the same module (default)
/// - \`public\`: Accessible from other modules
/// - \`open\`: Like public, but also allows subclassing and overriding
struct User {
    private var password: String  // Only accessible within User
    internal var name: String     // Accessible within module
    public var email: String      // Accessible from other modules
    
    init(name: String, email: String, password: String) {
        self.name = name
        self.email = email
        self.password = password
    }
    
    func authenticate(_ input: String) -> Bool {
        return input == password  // Can access private property
    }
}

/// ## Private vs Fileprivate
fileprivate class Helper {
    // Accessible to any code in this file
}

private class SecretHelper {
    // Accessible only within this declaration
}`;

  const codeExample4 = `/// Demonstrates Automatic Reference Counting (ARC).
///
/// ARC automatically manages memory by tracking how many references exist
/// to each class instance. When the reference count reaches zero, the instance is deallocated.
///
/// ## Strong References (Default)
/// Creates a strong reference that increases the reference count.
class Person {
    let name: String
    init(name: String) {
        self.name = name
    }
    deinit {
        print("\\(name) is being deinitialized")
    }
}

var person1: Person? = Person(name: "Alice")
var person2 = person1  // Strong reference
person1 = nil  // Person still exists (person2 holds reference)
person2 = nil  // Now deallocated

/// ## Weak References
/// Weak references don't increase the reference count.
class Apartment {
    let unit: String
    weak var tenant: Person?  // Weak reference
    init(unit: String) {
        self.unit = unit
    }
}

var john: Person? = Person(name: "John")
var apartment = Apartment(unit: "4A")
apartment.tenant = john  // Weak reference
john = nil  // Person deallocated, apartment.tenant becomes nil

/// ## Unowned References
/// Like weak, but assumes the reference is always valid.
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
}

class CreditCard {
    let number: UInt64
    unowned let customer: Customer  // Unowned reference
    init(number: UInt64, customer: Customer) {
        self.number = number
        self.customer = customer
    }
}`;

  return (
    <>
      <DocHeader
        title="Advanced Swift"
        subtitle="Master advanced Swift concepts: higher-order functions, error handling, access control, and Automatic Reference Counting (ARC)."
        chapter="001"
        readingTime="~20 min"
        progress={1.0}
      />

      <Callout kind="note" title="Advanced Concepts">
        These advanced topics build on the fundamentals and are essential for writing production-quality Swift code. Understanding these concepts will help you write safer, more maintainable, and more expressive code.
      </Callout>

      <h2>Higher-Order Functions</h2>

      <p>
        Higher-order functions are functions that operate on other functions, either by taking them as arguments or returning them. Swift's standard library provides powerful higher-order functions that make working with collections elegant and concise.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="HigherOrderFunctions.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Higher-Order Functions Comparison"
        headers={["Function", "Purpose", "Returns", "Example"]}
        rows={[
          {
            feature: "map",
            option1: (
              <>
                Transform each element
              </>
            ),
            option2: (
              <>
                Array of transformed elements
              </>
            ),
            option3: (
              <>
                <code className="text-xs">[1,2,3].map {"{"} $0 * 2 {"}"} {"->"} [2,4,6]</code>
              </>
            ),
          },
          {
            feature: "filter",
            option1: (
              <>
                Select matching elements
              </>
            ),
            option2: (
              <>
                Array of matching elements
              </>
            ),
            option3: (
              <>
                <code className="text-xs">[1,2,3,4].filter {"{"} $0 % 2 == 0 {"}"} {"->"} [2,4]</code>
              </>
            ),
          },
          {
            feature: "reduce",
            option1: (
              <>
                Combine all elements
              </>
            ),
            option2: (
              <>
                Single combined value
              </>
            ),
            option3: (
              <>
                <code className="text-xs">[1,2,3].reduce(0) {"{"} $0 + $1 {"}"} {"->"} 6</code>
              </>
            ),
          },
          {
            feature: "compactMap",
            option1: (
              <>
                Map and remove nils
              </>
            ),
            option2: (
              <>
                Array of non-nil values
              </>
            ),
            option3: (
              <>
                <code className="text-xs">["1","2","x"].compactMap(Int.init) {"->"} [1,2]</code>
              </>
            ),
          },
          {
            feature: "flatMap",
            option1: (
              <>
                Flatten nested collections
              </>
            ),
            option2: (
              <>
                Flattened array
              </>
            ),
            option3: (
              <>
                <code className="text-xs">[[1,2],[3]].flatMap {"{"} $0 {"}"} {"->"} [1,2,3]</code>
              </>
            ),
          },
        ]}
        caption="Higher-order functions enable functional programming patterns. They're more expressive than loops and often more performant."
      />

      <h2>Error Handling</h2>

      <p>
        Swift provides a robust, type-safe error handling system. Errors are represented by types conforming to the <code>Error</code> protocol, and functions that can throw errors are marked with <code>throws</code>.
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="ErrorHandling.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Error Handling Methods"
        headers={["Method", "Syntax", "Use Case", "Behavior"]}
        rows={[
          {
            feature: "do-catch",
            option1: (
              <>
                <code className="text-xs">do {"{"} try func() {"}"} catch {"{"} {"}"}</code>
              </>
            ),
            option2: (
              <>
                Handle specific errors
              </>
            ),
            option3: (
              <>
                Catches and handles errors explicitly
              </>
            ),
          },
          {
            feature: "try?",
            option1: (
              <>
                <code className="text-xs">let result = try? func()</code>
              </>
            ),
            option2: (
              <>
                Convert errors to optionals
              </>
            ),
            option3: (
              <>
                Returns nil if error occurs
              </>
            ),
          },
          {
            feature: "try!",
            option1: (
              <>
                <code className="text-xs">let result = try! func()</code>
              </>
            ),
            option2: (
              <>
                When error is impossible
              </>
            ),
            option3: (
              <>
                Crashes if error occurs
              </>
            ),
          },
          {
            feature: "rethrows",
            option1: (
              <>
                <code className="text-xs">func map{"<"}T{" >"}(_ transform: (Element) throws {"->"} T) rethrows {"->"} [T]</code>
              </>
            ),
            option2: (
              <>
                Propagate errors from closures
              </>
            ),
            option3: (
              <>
                Only throws if closure throws
              </>
            ),
          },
        ]}
        caption="Choose the appropriate error handling method based on your needs. Prefer do-catch for explicit handling, try? for optional results, and try! only when errors are truly impossible."
      />

      <h2>Access Control</h2>

      <p>
        Access control restricts access to parts of your code from code in other source files and modules. This enables encapsulation, information hiding, and helps prevent misuse of your APIs.
      </p>

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="AccessControl.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Access Control Levels"
        headers={["Level", "Scope", "Use Case", "Example"]}
        rows={[
          {
            feature: "private",
            option1: (
              <>
                Same declaration
              </>
            ),
            option2: (
              <>
                Implementation details, helper methods
              </>
            ),
            option3: (
              <>
                <code className="text-xs">private var password: String</code>
              </>
            ),
          },
          {
            feature: "fileprivate",
            option1: (
              <>
                Same source file
              </>
            ),
            option2: (
              <>
                Shared helpers within a file
              </>
            ),
            option3: (
              <>
                <code className="text-xs">fileprivate class Helper</code>
              </>
            ),
          },
          {
            feature: "internal",
            option1: (
              <>
                Same module (default)
              </>
            ),
            option2: (
              <>
                Module-internal APIs
              </>
            ),
            option3: (
              <>
                <code className="text-xs">internal var name: String</code>
              </>
            ),
          },
          {
            feature: "public",
            option1: (
              <>
                Other modules
              </>
            ),
            option2: (
              <>
                Public APIs, frameworks
              </>
            ),
            option3: (
              <>
                <code className="text-xs">public func calculate()</code>
              </>
            ),
          },
          {
            feature: "open",
            option1: (
              <>
                Other modules + subclassing
              </>
            ),
            option2: (
              <>
                Classes meant to be subclassed
              </>
            ),
            option3: (
              <>
                <code className="text-xs">open class BaseViewController</code>
              </>
            ),
          },
        ]}
        caption="Use the most restrictive access level that makes sense. Start with private and increase visibility only when necessary."
      />

      <h2>Automatic Reference Counting (ARC)</h2>

      <p>
        ARC automatically manages memory by tracking how many references exist to each class instance. When the reference count reaches zero, the instance is automatically deallocated. Understanding ARC is crucial for avoiding memory leaks and retain cycles.
      </p>

      <DocCBlock
        code={codeExample4}
        lang="swift"
        filename="ARC.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Reference Types in ARC"
        headers={["Type", "Behavior", "Use Case", "Example"]}
        rows={[
          {
            feature: "Strong (Default)",
            option1: (
              <>
                Increases reference count
              </>
            ),
            option2: (
              <>
                Normal ownership, parent-child relationships
              </>
            ),
            option3: (
              <>
                <code className="text-xs">var person: Person?</code>
              </>
            ),
          },
          {
            feature: "Weak",
            option1: (
              <>
                Doesn't increase count, becomes nil when deallocated
              </>
            ),
            option2: (
              <>
                Breaking retain cycles, optional references
              </>
            ),
            option3: (
              <>
                <code className="text-xs">weak var delegate: Delegate?</code>
              </>
            ),
          },
          {
            feature: "Unowned",
            option1: (
              <>
                Doesn't increase count, assumes always valid
              </>
            ),
            option2: (
              <>
                When reference outlives object
              </>
            ),
            option3: (
              <>
                <code className="text-xs">unowned let owner: Owner</code>
              </>
            ),
          },
        ]}
        caption="Use strong references by default. Use weak for optional references that might be deallocated. Use unowned only when you're certain the reference will outlive the object."
      />

      <FlowChart
        title="Choosing Reference Type for ARC"
        caption="Decision tree for selecting strong, weak, or unowned references"
        width={700}
        height={500}
        nodes={[
          { id: "start", label: "Need a reference?", type: "start", position: { x: 350, y: 50 } },
          { id: "optional", label: "Reference can be nil?", type: "decision", position: { x: 350, y: 150 } },
          { id: "cycle", label: "Risk of retain cycle?", type: "decision", position: { x: 350, y: 280 } },
          { id: "lifetime", label: "Reference outlives object?", type: "decision", position: { x: 350, y: 410 } },
          { id: "strong", label: "Use Strong", type: "end", position: { x: 150, y: 450 } },
          { id: "weak", label: "Use Weak", type: "end", position: { x: 350, y: 450 } },
          { id: "unowned", label: "Use Unowned", type: "end", position: { x: 550, y: 450 } },
        ]}
        edges={[
          { from: "start", to: "optional" },
          { from: "optional", to: "weak", label: "Yes" },
          { from: "optional", to: "cycle", label: "No" },
          { from: "cycle", to: "weak", label: "Yes" },
          { from: "cycle", to: "lifetime", label: "No" },
          { from: "lifetime", to: "unowned", label: "Yes" },
          { from: "lifetime", to: "strong", label: "No" },
        ]}
      />

      <Callout kind="warning" title="Retain Cycles">
        <p className="text-sm mb-2">
          Retain cycles occur when two objects hold strong references to each other, preventing both from being deallocated. Common scenarios:
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs text-fg-muted">
          <li>Closures capturing <code>self</code> strongly</li>
          <li>Parent-child relationships with bidirectional references</li>
          <li>Delegates with strong references</li>
        </ul>
        <p className="text-xs mt-2 text-fg-muted">
          Always use <code>weak</code> or <code>unowned</code> in these cases to break the cycle.
        </p>
      </Callout>

      <h2>Generics</h2>

      <p>
        Generics enable you to write flexible, reusable functions and types that can work with any type, subject to requirements that you define. They're one of Swift's most powerful features and are used extensively throughout the standard library.
      </p>

      <DocCBlock
        code={`/// Demonstrates generics in Swift.
///
/// Generics enable you to write code that works with any type while
/// maintaining type safety. They're essential for creating reusable components.
///
/// ## Generic Functions
/// Functions that work with any type.
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)

var someString = "hello"
var anotherString = "world"
swapTwoValues(&someString, &anotherString)

/// ## Generic Types
/// Types that work with any type.
struct Stack<Element> {
    var items: [Element] = []
    
    mutating func push(_ item: Element) {
        items.append(item)
    }
    
    mutating func pop() -> Element {
        return items.removeLast()
    }
}

var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")

/// ## Generic Constraints
/// Require types to conform to protocols or inherit from classes.
func findIndex<T: Equatable>(of valueToFind: T, in array: [T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}

/// ## Associated Types
/// Protocols that use associated types for flexibility.
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

struct IntStack: Container {
    typealias Item = Int
    var items: [Int] = []
    
    mutating func append(_ item: Int) {
        items.append(item)
    }
    
    var count: Int {
        return items.count
    }
    
    subscript(i: Int) -> Int {
        return items[i]
    }
}`}
        lang="swift"
        filename="Generics.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Generic Concepts"
        headers={["Concept", "Syntax", "Purpose", "Example"]}
        rows={[
          {
            feature: "Generic Function",
            option1: (
              <>
                <code className="text-xs">func {"<"}T{">"}(_ param: T)</code>
              </>
            ),
            option2: (
              <>
                Work with any type
              </>
            ),
            option3: (
              <>
                <code className="text-xs">swapTwoValues{"<"}Int{">"}(&a, &b)</code>
              </>
            ),
          },
          {
            feature: "Generic Type",
            option1: (
              <>
                <code className="text-xs">struct Stack{"<"}Element{">"} {"{"} {"}"}</code>
              </>
            ),
            option2: (
              <>
                Type that works with any type
              </>
            ),
            option3: (
              <>
                <code className="text-xs">var stack = Stack{"<"}String{">"}()</code>
              </>
            ),
          },
          {
            feature: "Type Constraint",
            option1: (
              <>
                <code className="text-xs">func {"<"}T: Protocol{">"}(_ param: T)</code>
              </>
            ),
            option2: (
              <>
                Require protocol conformance
              </>
            ),
            option3: (
              <>
                <code className="text-xs">{"<"}T: Equatable{">"}</code>
              </>
            ),
          },
          {
            feature: "Associated Type",
            option1: (
              <>
                <code className="text-xs">associatedtype Item</code>
              </>
            ),
            option2: (
              <>
                Protocol placeholder for type
              </>
            ),
            option3: (
              <>
                <code className="text-xs">protocol Container {"{"} associatedtype Item {"}"}</code>
              </>
            ),
          },
        ]}
        caption="Generics enable type-safe, reusable code. Use them to create functions and types that work with multiple types while maintaining compile-time safety."
      />

      <h2>Type Casting</h2>

      <p>
        Type casting is a way to check the type of an instance, or to treat that instance as a different superclass or subclass from somewhere else in its class hierarchy. Swift provides two operators: <code>is</code> (type check) and <code>as</code> (type cast).
      </p>

      <DocCBlock
        code={`/// Demonstrates type casting in Swift.
///
/// Type casting allows you to check and convert types at runtime.
/// Use \`is\` to check type and \`as\` to cast to a type.
///
/// ## Type Check Operator (is)
/// Check whether an instance is of a certain type.
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}

class Movie: MediaItem {
    var director: String
    init(name: String, director: String) {
        self.director = director
        super.init(name: name)
    }
}

class Song: MediaItem {
    var artist: String
    init(name: String, artist: String) {
        self.artist = artist
        super.init(name: name)
    }
}

let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles")
]

var movieCount = 0
var songCount = 0

for item in library {
    if item is Movie {
        movieCount += 1
    } else if item is Song {
        songCount += 1
    }
}

/// ## Type Cast Operators (as, as?, as!)
/// Cast to a different type.
for item in library {
    if let movie = item as? Movie {
        print("Movie: \\(movie.name), dir. \\(movie.director)")
    } else if let song = item as? Song {
        print("Song: \\(song.name), by \\(song.artist)")
    }
}

/// ## Downcasting
/// Cast to a subclass type.
let someItem: MediaItem = Movie(name: "2001", director: "Kubrick")
if let movie = someItem as? Movie {
    print("Director: \\(movie.director)")
}

/// ## Type Casting for Any and AnyObject
/// Work with types that aren't known at compile time.
var things: [Any] = []
things.append(0)
things.append(0.0)
things.append(42)
things.append(3.14159)
things.append("hello")
things.append((3.0, 5.0))
things.append(Movie(name: "Ghostbusters", director: "Ivan Reitman"))

for thing in things {
    switch thing {
    case 0 as Int:
        print("zero as an Int")
    case 0 as Double:
        print("zero as a Double")
    case let someInt as Int:
        print("an integer value of \\(someInt)")
    case let someDouble as Double where someDouble > 0:
        print("a positive double value of \\(someDouble)")
    case is String:
        print("some string value")
    case let (x, y) as (Double, Double):
        print("an (x, y) point at \\(x), \\(y)")
    case let movie as Movie:
        print("a movie called \\(movie.name)")
    default:
        print("something else")
    }
}`}
        lang="swift"
        filename="TypeCasting.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Type Casting Operators"
        headers={["Operator", "Syntax", "Behavior", "When to Use"]}
        rows={[
          {
            feature: "is",
            option1: (
              <>
                <code className="text-xs">item is Movie</code>
              </>
            ),
            option2: (
              <>
                Returns true if type matches
              </>
            ),
            option3: (
              <>
                Check type without casting
              </>
            ),
          },
          {
            feature: "as?",
            option1: (
              <>
                <code className="text-xs">item as? Movie</code>
              </>
            ),
            option2: (
              <>
                Returns optional, nil if cast fails
              </>
            ),
            option3: (
              <>
                Safe downcasting (preferred)
              </>
            ),
          },
          {
            feature: "as!",
            option1: (
              <>
                <code className="text-xs">item as! Movie</code>
              </>
            ),
            option2: (
              <>
                Force cast, crashes if fails
              </>
            ),
            option3: (
              <>
                When you're certain of type
              </>
            ),
          },
          {
            feature: "as",
            option1: (
              <>
                <code className="text-xs">item as MediaItem</code>
              </>
            ),
            option2: (
              <>
                Upcast (always succeeds)
              </>
            ),
            option3: (
              <>
                Upcasting to superclass
              </>
            ),
          },
        ]}
        caption="Use is for type checking, as? for safe downcasting, as! only when certain, and as for upcasting. Prefer as? over as! for safety."
      />

      <h2>Optional Chaining</h2>

      <p>
        Optional chaining is a process for querying and calling properties, methods, and subscripts on an optional that might currently be nil. If the optional contains a value, the call succeeds; if it's nil, the call returns nil.
      </p>

      <DocCBlock
        code={`/// Demonstrates optional chaining in Swift.
///
/// Optional chaining allows you to safely access properties, methods,
/// and subscripts on optionals. If any part of the chain is nil, the
/// entire expression evaluates to nil.
///
/// ## Basic Optional Chaining
/// Access properties and methods on optionals.
class Person {
    var residence: Residence?
}

class Residence {
    var numberOfRooms = 1
    var address: Address?
}

class Address {
    var buildingName: String?
    var buildingNumber: String?
    var street: String?
    
    func buildingIdentifier() -> String? {
        if let buildingNumber = buildingNumber, let street = street {
            return "\\(buildingNumber) \\(street)"
        } else if buildingName != nil {
            return buildingName
        } else {
            return nil
        }
    }
}

let john = Person()
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \\(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}

/// ## Chaining Multiple Levels
/// Chain through multiple optional levels.
if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \\(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}

/// ## Calling Methods Through Optional Chaining
/// Call methods on optionals.
if john.residence?.address?.buildingIdentifier() != nil {
    print("It was possible to print the address.")
} else {
    print("It was not possible to print the address.")
}

/// ## Accessing Subscripts Through Optional Chaining
/// Access subscripts on optionals.
var testScores = ["Dave": [86, 82, 84], "Bev": [79, 94, 81]]
testScores["Dave"]?[0] = 91
testScores["Bev"]?[0] += 1
testScores["Brian"]?[0] = 72  // Fails silently, Brian doesn't exist`}
        lang="swift"
        filename="OptionalChaining.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <Callout kind="info" title="Optional Chaining vs Force Unwrapping">
        <p className="text-sm mb-2">
          Optional chaining (<code>?</code>) is safer than force unwrapping (<code>!</code>):
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs text-fg-muted">
          <li>Optional chaining returns <code>nil</code> if any part is <code>nil</code></li>
          <li>Force unwrapping crashes if the value is <code>nil</code></li>
          <li>Always prefer optional chaining for safety</li>
        </ul>
      </Callout>

      <KeyTakeaways
        items={[
          "Higher-order functions (map, filter, reduce) enable functional programming patterns and make code more expressive.",
          "Error handling uses the Error protocol, throws keyword, and do-catch statements for type-safe error management.",
          "Access control (private, internal, public, open) enables encapsulation and API design.",
          "ARC automatically manages memory, but you must use weak/unowned to break retain cycles.",
          "Generics enable type-safe, reusable code that works with any type.",
          "Type casting (is, as?, as!) allows runtime type checking and conversion.",
          "Optional chaining provides safe access to properties, methods, and subscripts on optionals.",
          "Understanding these advanced concepts is essential for writing production-quality Swift code.",
        ]}
        mentalModel="Think of higher-order functions as tools for transforming data, error handling as a type-safe way to handle failures, access control as boundaries for your code, ARC as automatic memory management that requires your help to avoid cycles, generics as templates for reusable code, type casting as runtime type inspection, and optional chaining as safe navigation through potentially nil values."
      />

      <PageNavigation currentPage={nav} />
    </>
  );
}

