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

export default async function ObjectOrientedProgramming() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/object-oriented-programming");
  const codeExample1 = `// Structure (value type)
struct Point {
    var x: Double
    var y: Double
    
    // Computed property
    var distanceFromOrigin: Double {
        return sqrt(x * x + y * y)
    }
    
    // Method
    func distance(to other: Point) -> Double {
        let dx = x - other.x
        let dy = y - other.y
        return sqrt(dx * dx + dy * dy)
    }
}

var point1 = Point(x: 3.0, y: 4.0)
var point2 = point1  // Copy, not reference
point2.x = 5.0
print(point1.x)  // Still 3.0

// Class (reference type)
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func describe() -> String {
        return "\\(name) is \\(age) years old"
    }
}

let person1 = Person(name: "Alice", age: 30)
let person2 = person1  // Reference, not copy
person2.age = 31
print(person1.age)  // Also 31`;

  const codeExample2 = `// Inheritance
class Vehicle {
    var currentSpeed = 0.0
    var description: String {
        return "traveling at \\(currentSpeed) miles per hour"
    }
    
    func makeNoise() {
        // Override in subclass
    }
}

class Bicycle: Vehicle {
    var hasBasket = false
    
    override func makeNoise() {
        print("Ring ring!")
    }
}

class Car: Vehicle {
    var gear = 1
    
    override var description: String {
        return super.description + " in gear \\(gear)"
    }
    
    override func makeNoise() {
        print("Vroom!")
    }
}

let bicycle = Bicycle()
bicycle.currentSpeed = 15.0
bicycle.hasBasket = true
print(bicycle.description)  // "traveling at 15.0 miles per hour"
bicycle.makeNoise()  // "Ring ring!"`;

  const codeExample3 = `// Extensions - add functionality to existing types
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
}

let distance = 5.0
print("\\(distance) km = \\(distance.km) meters")

extension Int {
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}

3.repetitions {
    print("Hello!")
}

// Extension with computed properties
extension String {
    var isEmail: Bool {
        return self.contains("@") && self.contains(".")
    }
}

let email = "user@example.com"
print(email.isEmail)  // true`;

  const codeExample4 = `// Protocol definition
protocol FullyNamed {
    var fullName: String { get }
}

protocol Describable {
    func describe() -> String
}

// Class conforming to protocol
class Person: FullyNamed {
    var firstName: String
    var lastName: String
    
    var fullName: String {
        return "\\(firstName) \\(lastName)"
    }
    
    init(firstName: String, lastName: String) {
        self.firstName = firstName
        self.lastName = lastName
    }
}

// Struct conforming to protocol
struct Location: FullyNamed, Describable {
    var city: String
    var country: String
    
    var fullName: String {
        return "\\(city), \\(country)"
    }
    
    func describe() -> String {
        return "Located in \\(fullName)"
    }
}

// Protocol with method requirements
protocol Movable {
    func move()
}

class Car: Movable {
    func move() {
        print("Car is moving")
    }
}

class Bicycle: Movable {
    func move() {
        print("Bicycle is pedaling")
    }
}

// Protocol as type
func makeItMove(_ movable: Movable) {
    movable.move()
}

let car = Car()
let bike = Bicycle()
makeItMove(car)   // "Car is moving"
makeItMove(bike)  // "Bicycle is pedaling"`;

  const codeExample5 = `// Structs vs Classes

// Struct (Value Type)
struct Point {
    var x: Int
    var y: Int
}

var point1 = Point(x: 10, y: 20)
var point2 = point1  // Independent copy
point2.x = 30
print(point1.x)  // 10 (unchanged)

// Class (Reference Type)
class Person {
    var name: String
    init(name: String) { self.name = name }
}

var person1 = Person(name: "Alice")
var person2 = person1  // Same reference
person2.name = "Bob"
print(person1.name)  // "Bob" (changed)

// Identity operators for classes
if person1 === person2 {
    print("Same instance")
}

// Key differences:
// - Structs: Value types, copied on assignment
// - Classes: Reference types, shared references
// - Classes: Support inheritance
// - Classes: Identity operators (===, !==)
// - Structs: Preferred in Swift for most use cases`;

  return (
    <>
      <DocHeader
        title="Object-Oriented Programming"
        subtitle="Master Swift's OOP concepts: classes, structs, extensions, inheritance, and protocols—the building blocks of Swift's type system."
        chapter="001"
        readingTime="~18 min"
        progress={1.0}
      />

      <Callout kind="note" title="OOP in Swift">
        Swift supports object-oriented programming through classes and structures, but with important distinctions. Understanding when to use structs vs classes, and how protocols enable polymorphism, is key to writing effective Swift code.
      </Callout>

      <h2>Classes and Structs</h2>

      <p>
        Both classes and structs can define properties, methods, initializers, and conform to protocols. However, they have fundamental differences that affect how your code behaves. Understanding these differences is crucial for writing effective Swift code.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="ClassesAndStructs.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Structs vs Classes: Complete Comparison"
        headers={["Feature", "Structs", "Classes", "When to Use"]}
        rows={[
          {
            feature: "Type",
            option1: (
              <>
                <strong className="text-fg">Value Type</strong>
                <br />
                <span className="text-fg-subtle text-xs">
                  Copied on assignment
                </span>
              </>
            ),
            option2: (
              <>
                <strong className="text-fg">Reference Type</strong>
                <br />
                <span className="text-fg-subtle text-xs">
                  Shared references
                </span>
              </>
            ),
            option3: (
              <>
                Structs: Most data models, simple types
                <br />
                Classes: When you need shared state or identity
              </>
            ),
          },
          {
            feature: "Inheritance",
            option1: (
              <>
                <span className="text-fg-muted">Not supported</span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg">Single inheritance supported</span>
              </>
            ),
            option3: (
              <>
                Use classes when you need class hierarchies
              </>
            ),
          },
          {
            feature: "Identity",
            option1: (
              <>
                <span className="text-fg-muted">No identity operators</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Equality based on values
                </span>
              </>
            ),
            option2: (
              <>
                <code className="text-accent">===</code> and <code className="text-accent">!==</code>
                <br />
                <span className="text-fg-subtle text-xs">
                  Check if same instance
                </span>
              </>
            ),
            option3: (
              <>
                Classes: When you need to check if two references point to the same object
              </>
            ),
          },
          {
            feature: "Memory",
            option1: (
              <>
                <span className="text-fg">Stack allocation</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Faster, automatic cleanup
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg">Heap allocation</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Managed by ARC
                </span>
              </>
            ),
            option3: (
              <>
                Structs: Better performance for small, frequently copied data
              </>
            ),
          },
          {
            feature: "Mutability",
            option1: (
              <>
                <code className="text-accent">mutating</code> keyword needed
                <br />
                <span className="text-fg-subtle text-xs">
                  For methods that modify properties
                </span>
              </>
            ),
            option2: (
              <>
                No special keyword needed
                <br />
                <span className="text-fg-subtle text-xs">
                  Methods can modify properties directly
                </span>
              </>
            ),
            option3: (
              <>
                Structs: Encourages immutability
                <br />
                Classes: More flexible mutation
              </>
            ),
          },
          {
            feature: "Deinitializers",
            option1: (
              <>
                <span className="text-fg-muted">Not available</span>
              </>
            ),
            option2: (
              <>
                <code className="text-accent">deinit</code> available
                <br />
                <span className="text-fg-subtle text-xs">
                  For cleanup when deallocated
                </span>
              </>
            ),
            option3: (
              <>
                Classes: When you need cleanup logic
              </>
            ),
          },
        ]}
        caption="Swift's standard library and best practices favor structs. Use structs by default, and only use classes when you specifically need reference semantics, inheritance, or identity comparison."
      />

      <FlowChart
        title="When to Use Structs vs Classes"
        caption="Decision tree based on Apple's recommendations and Swift best practices"
        width={700}
        height={600}
        nodes={[
          { id: "start", label: "Need to model data?", type: "start", position: { x: 350, y: 50 } },
          { id: "inheritance", label: "Need inheritance?", type: "decision", position: { x: 350, y: 150 } },
          { id: "identity", label: "Need identity comparison?", type: "decision", position: { x: 350, y: 250 } },
          { id: "shared", label: "Need shared mutable state?", type: "decision", position: { x: 350, y: 350 } },
          { id: "deinit", label: "Need deinitializer?", type: "decision", position: { x: 350, y: 450 } },
          { id: "use-class", label: "Use Class", type: "end", position: { x: 550, y: 530 } },
          { id: "use-struct", label: "Use Struct", type: "end", position: { x: 150, y: 530 } },
        ]}
        edges={[
          { from: "start", to: "inheritance" },
          { from: "inheritance", to: "use-class", label: "Yes" },
          { from: "inheritance", to: "identity", label: "No" },
          { from: "identity", to: "use-class", label: "Yes" },
          { from: "identity", to: "shared", label: "No" },
          { from: "shared", to: "use-class", label: "Yes" },
          { from: "shared", to: "deinit", label: "No" },
          { from: "deinit", to: "use-class", label: "Yes" },
          { from: "deinit", to: "use-struct", label: "No" },
        ]}
      />

      <CompareBlock
        badTitle="Using Class Unnecessarily"
        goodTitle="Using Struct (Preferred)"
        bad={
          <>
            <code className="text-xs block mb-2">
              class Point {"{"}
              <br />
              {"  "}var x: Double
              <br />
              {"  "}var y: Double
              <br />
              {"}"}
              <br />
              <br />
              var p1 = Point(x: 1, y: 2)
              <br />
              var p2 = p1  // Same reference!
              <br />
              p2.x = 5
              <br />
              print(p1.x)  // Also 5 (unexpected!)
            </code>
            <p className="text-xs mt-2 text-warning">
              ❌ Unnecessary heap allocation, shared state can cause bugs
            </p>
          </>
        }
        good={
          <>
            <code className="text-xs block mb-2">
              struct Point {"{"}
              <br />
              {"  "}var x: Double
              <br />
              {"  "}var y: Double
              <br />
              {"}"}
              <br />
              <br />
              var p1 = Point(x: 1, y: 2)
              <br />
              var p2 = p1  // Independent copy
              <br />
              p2.x = 5
              <br />
              print(p1.x)  // Still 1 (expected!)
            </code>
            <p className="text-xs mt-2 text-success">
              ✅ Stack allocation, value semantics, thread-safe
            </p>
          </>
        }
      />

      <h2>Inheritance</h2>

      <p>
        Inheritance allows a class to inherit characteristics from another class. A class that inherits from another is called a subclass, and the class it inherits from is called a superclass. Swift supports single inheritance—each class can have only one superclass, but can conform to multiple protocols.
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="Inheritance.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Inheritance Keywords"
        headers={["Keyword", "Purpose", "Syntax", "Example"]}
        rows={[
          {
            feature: "override",
            option1: (
              <>
                Provide custom implementation of inherited member
              </>
            ),
            option2: (
              <>
                <code className="text-accent">override func method()</code>
              </>
            ),
            option3: (
              <>
                <code className="text-xs">override func makeNoise() {"{"} print("Vroom!") {"}"}</code>
              </>
            ),
          },
          {
            feature: "super",
            option1: (
              <>
                Access superclass methods, properties, or initializers
              </>
            ),
            option2: (
              <>
                <code className="text-accent">super.method()</code>
              </>
            ),
            option3: (
              <>
                <code className="text-xs">return super.description + " in gear"</code>
              </>
            ),
          },
          {
            feature: "final",
            option1: (
              <>
                Prevent further inheritance or overriding
              </>
            ),
            option2: (
              <>
                <code className="text-accent">final class</code> or <code className="text-accent">final func</code>
              </>
            ),
            option3: (
              <>
                <code className="text-xs">final class Car: Vehicle {"{"} {"}"}</code>
              </>
            ),
          },
        ]}
        caption="Use inheritance carefully. Swift encourages composition over inheritance through protocols and extensions."
      />

      <Callout kind="warning" title="Inheritance vs Composition">
        <p className="text-sm mb-2">
          <strong>Inheritance</strong> creates tight coupling and can lead to fragile base class problems. <strong>Composition</strong> (using protocols and structs) is often preferred in Swift.
        </p>
        <p className="text-xs text-fg-muted">
          Prefer protocols and protocol extensions over deep class hierarchies. This makes your code more flexible and testable.
        </p>
      </Callout>

      <h2>Properties</h2>

      <p>
        Properties associate values with a particular class, structure, or enumeration. Swift provides several types of properties: stored properties, computed properties, and property observers.
      </p>

      <DocCBlock
        code={`/// Demonstrates different types of properties in Swift.
///
/// Properties can be stored (store values) or computed (calculate values).
/// Property observers can monitor changes to property values.
///
/// ## Stored Properties
/// Store constant or variable values as part of an instance.
struct FixedLengthRange {
    var firstValue: Int  // Variable stored property
    let length: Int      // Constant stored property
}

/// ## Computed Properties
/// Calculate a value rather than store it.
struct Rectangle {
    var width: Double
    var height: Double
    
    var area: Double {  // Computed property (read-only)
        return width * height
    }
    
    var perimeter: Double {  // Computed property with getter and setter
        get {
            return 2 * (width + height)
        }
        set {
            // Assume square when setting perimeter
            let side = newValue / 4
            width = side
            height = side
        }
    }
}

/// ## Property Observers
/// Monitor and respond to changes in property values.
class StepCounter {
    var totalSteps: Int = 0 {
        willSet {
            print("About to set totalSteps to \\(newValue)")
        }
        didSet {
            if totalSteps > oldValue {
                print("Added \\(totalSteps - oldValue) steps")
            }
        }
    }
}

/// ## Type Properties
/// Properties that belong to the type itself, not instances.
struct SomeStructure {
    static var storedTypeProperty = "Some value"
    static var computedTypeProperty: Int {
        return 1
    }
}

enum SomeEnumeration {
    static var storedTypeProperty = "Some value"
    static var computedTypeProperty: Int {
        return 6
    }
}

class SomeClass {
    static var storedTypeProperty = "Some value"
    static var computedTypeProperty: Int {
        return 27
    }
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}`}
        lang="swift"
        filename="Properties.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Property Types Comparison"
        headers={["Type", "Stores Value", "Syntax", "Use Case"]}
        rows={[
          {
            feature: "Stored Property",
            option1: (
              <>
                <span className="text-fg">Yes</span>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">var name: String</code>
              </>
            ),
            option3: (
              <>
                Store data as part of instance
              </>
            ),
          },
          {
            feature: "Computed Property",
            option1: (
              <>
                <span className="text-fg-muted">No</span>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">var area: Double {"{"} get {"{"} return w * h {"}"} {"}"}</code>
              </>
            ),
            option3: (
              <>
                Calculate value from other properties
              </>
            ),
          },
          {
            feature: "Property Observer",
            option1: (
              <>
                <span className="text-fg">Yes (on stored)</span>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">var value: Int {"{"} willSet {"{"} {"}"} didSet {"{"} {"}"} {"}"}</code>
              </>
            ),
            option3: (
              <>
                React to property changes
              </>
            ),
          },
          {
            feature: "Type Property",
            option1: (
              <>
                <span className="text-fg">Yes (static)</span>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">static var count: Int = 0</code>
              </>
            ),
            option3: (
              <>
                Shared value across all instances
              </>
            ),
          },
        ]}
        caption="Choose the right property type based on whether you need to store a value, compute it, observe changes, or share it across instances."
      />

      <h2>Methods</h2>

      <p>
        Methods are functions that are associated with a particular type. Swift supports instance methods (called on instances) and type methods (called on the type itself).
      </p>

      <DocCBlock
        code={`/// Demonstrates methods in Swift.
///
/// Methods are functions associated with a type. They can be instance methods
/// (called on instances) or type methods (called on the type itself).
///
/// ## Instance Methods
/// Functions that belong to instances of a class, struct, or enum.
class Counter {
    var count = 0
    
    func increment() {
        count += 1
    }
    
    func increment(by amount: Int) {
        count += amount
    }
    
    func reset() {
        count = 0
    }
}

/// ## Mutating Methods
/// Methods that modify struct or enum properties must be marked \`mutating\`.
struct Point {
    var x = 0.0, y = 0.0
    
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}

/// ## Type Methods
/// Methods called on the type itself, not on instances.
struct LevelTracker {
    static var highestUnlockedLevel = 1
    var currentLevel = 1
    
    static func unlock(_ level: Int) {
        if level > highestUnlockedLevel {
            highestUnlockedLevel = level
        }
    }
    
    static func isUnlocked(_ level: Int) -> Bool {
        return level <= highestUnlockedLevel
    }
}`}
        lang="swift"
        filename="Methods.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h2>Subscripts</h2>

      <p>
        Subscripts provide shortcuts for accessing elements of a collection, list, or sequence. They enable you to query instances by writing one or more values in square brackets.
      </p>

      <DocCBlock
        code={`/// Demonstrates subscripts in Swift.
///
/// Subscripts enable you to access elements of a collection using
/// square bracket syntax, similar to arrays and dictionaries.
///
/// ## Basic Subscript
/// Access elements using an index.
struct TimesTable {
    let multiplier: Int
    
    subscript(index: Int) -> Int {
        return multiplier * index
    }
}

let threeTimesTable = TimesTable(multiplier: 3)
print(threeTimesTable[6])  // 18

/// ## Subscript with Multiple Parameters
/// Subscripts can take multiple parameters.
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }
    
    func indexIsValid(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}

var matrix = Matrix(rows: 2, columns: 2)
matrix[0, 1] = 1.5
matrix[1, 0] = 3.2`}
        lang="swift"
        filename="Subscripts.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h2>Initialization</h2>

      <p>
        Initialization is the process of preparing an instance of a class, structure, or enumeration for use. Swift provides several types of initializers: designated, convenience, required, and failable initializers.
      </p>

      <DocCBlock
        code={`/// Demonstrates initialization in Swift.
///
/// Initializers prepare instances for use. Swift provides designated initializers
/// (primary), convenience initializers (secondary), and failable initializers.
///
/// ## Designated Initializers
/// Primary initializers that fully initialize all properties.
class Food {
    var name: String
    
    init(name: String) {
        self.name = name
    }
}

/// ## Convenience Initializers
/// Secondary initializers that call designated initializers.
class RecipeIngredient: Food {
    var quantity: Int
    
    init(name: String, quantity: Int) {
        self.quantity = quantity
        super.init(name: name)
    }
    
    convenience init(name: String) {
        self.init(name: name, quantity: 1)
    }
}

/// ## Failable Initializers
/// Initializers that can return nil if initialization fails.
struct Animal {
    let species: String
    
    init?(species: String) {
        if species.isEmpty {
            return nil
        }
        self.species = species
    }
}

let someCreature = Animal(species: "Giraffe")  // Optional(Animal)
let anonymousCreature = Animal(species: "")    // nil

/// ## Required Initializers
/// Initializers that must be implemented by subclasses.
class SomeClass {
    required init() {
        // Initializer implementation
    }
}

class SomeSubclass: SomeClass {
    required init() {
        // Must implement required initializer
    }
}`}
        lang="swift"
        filename="Initialization.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Initializer Types"
        headers={["Type", "Syntax", "Purpose", "When to Use"]}
        rows={[
          {
            feature: "Designated",
            option1: (
              <>
                <code className="text-xs">init(param: Type) {"{"} {"}"}</code>
              </>
            ),
            option2: (
              <>
                Primary initializer, fully initializes properties
              </>
            ),
            option3: (
              <>
                Main way to create instances
              </>
            ),
          },
          {
            feature: "Convenience",
            option1: (
              <>
                <code className="text-xs">convenience init(param: Type) {"{"} self.init(...) {"}"}</code>
              </>
            ),
            option2: (
              <>
                Secondary initializer, calls designated
              </>
            ),
            option3: (
              <>
                Provide alternative initialization paths
              </>
            ),
          },
          {
            feature: "Failable",
            option1: (
              <>
                <code className="text-xs">init?(param: Type) {"{"} if invalid {"{"} return nil {"}"} {"}"}</code>
              </>
            ),
            option2: (
              <>
                Can return nil if initialization fails
              </>
            ),
            option3: (
              <>
                When initialization might fail
              </>
            ),
          },
          {
            feature: "Required",
            option1: (
              <>
                <code className="text-xs">required init() {"{"} {"}"}</code>
              </>
            ),
            option2: (
              <>
                Must be implemented by subclasses
              </>
            ),
            option3: (
              <>
                When all subclasses must have this initializer
              </>
            ),
          },
        ]}
        caption="Use designated initializers as the primary way to create instances. Convenience initializers provide shortcuts. Failable initializers handle cases where initialization might fail."
      />

      <h2>Deinitialization</h2>

      <p>
        Deinitializers are called immediately before a class instance is deallocated. They're only available for classes, not structs or enums, and are useful for cleaning up resources.
      </p>

      <DocCBlock
        code={`/// Demonstrates deinitialization in Swift.
///
/// Deinitializers are called automatically when an instance is deallocated.
/// They're only available for classes and are useful for cleanup.
///
/// ## Basic Deinitializer
/// Clean up resources before deallocation.
class Bank {
    static var coinsInBank = 10_000
    
    static func distribute(coins numberOfCoinsRequested: Int) -> Int {
        let numberOfCoinsToVend = min(numberOfCoinsRequested, coinsInBank)
        coinsInBank -= numberOfCoinsToVend
        return numberOfCoinsToVend
    }
    
    static func receive(coins: Int) {
        coinsInBank += coins
    }
}

class Player {
    var coinsInPurse: Int
    
    init(coins: Int) {
        coinsInPurse = Bank.distribute(coins: coins)
    }
    
    func win(coins: Int) {
        coinsInPurse += Bank.distribute(coins: coins)
    }
    
    deinit {
        Bank.receive(coins: coinsInPurse)
        print("Player left the game with \\(coinsInPurse) coins returned to bank")
    }
}

var playerOne: Player? = Player(coins: 100)
playerOne = nil  // Deinitializer called automatically`}
        lang="swift"
        filename="Deinitialization.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <Callout kind="info" title="Deinitialization Notes">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Deinitializers are called automatically—you never call them directly</li>
          <li>Only classes can have deinitializers (structs and enums cannot)</li>
          <li>Deinitializers don't take parameters and can't return values</li>
          <li>Use deinitializers to clean up resources like file handles, network connections, or observers</li>
        </ul>
      </Callout>

      <h2>Extensions</h2>

      <p>
        Extensions add new functionality to existing classes, structures, enumerations, or protocol types. This includes the ability to extend types for which you don't have access to the original source code.
      </p>

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="Extensions.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h3>What Extensions Can Do</h3>
      <ul>
        <li>Add computed instance properties and computed type properties</li>
        <li>Define instance methods and type methods</li>
        <li>Provide new initializers</li>
        <li>Define subscripts</li>
        <li>Define and use new nested types</li>
        <li>Make an existing type conform to a protocol</li>
      </ul>

      <Callout kind="warning" title="Extensions Limitations">
        Extensions cannot add stored properties or property observers to existing types. They also cannot add designated initializers or deinitializers to a class.
      </Callout>

      <h2>Protocols</h2>

      <p>
        Protocols define a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. Classes, structures, and enumerations can adopt protocols to provide actual implementations. Protocols are the foundation of Swift's protocol-oriented programming paradigm.
      </p>

      <DocCBlock
        code={codeExample4}
        lang="swift"
        filename="Protocols.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Protocols vs Inheritance"
        headers={["Aspect", "Protocols", "Inheritance", "Best For"]}
        rows={[
          {
            feature: "Flexibility",
            option1: (
              <>
                <span className="text-fg">Multiple protocol conformance</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  One type can conform to many protocols
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Single inheritance only</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  One superclass per class
                </span>
              </>
            ),
            option3: (
              <>
                Protocols: Flexible, composable designs
                <br />
                Inheritance: When you need shared implementation
              </>
            ),
          },
          {
            feature: "Types",
            option1: (
              <>
                <span className="text-fg">Works with structs, classes, enums</span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Classes only</span>
              </>
            ),
            option3: (
              <>
                Protocols: Value types and reference types
              </>
            ),
          },
          {
            feature: "Default Implementation",
            option1: (
              <>
                <span className="text-fg">Protocol extensions provide defaults</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Can add methods to all conforming types
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg">Superclass provides implementation</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Subclasses inherit and can override
                </span>
              </>
            ),
            option3: (
              <>
                Both: Sharing common functionality
              </>
            ),
          },
          {
            feature: "Coupling",
            option1: (
              <>
                <span className="text-fg">Loose coupling</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Depend on interface, not implementation
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Tight coupling</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Subclass depends on superclass details
                </span>
              </>
            ),
            option3: (
              <>
                Protocols: Better for testing and flexibility
              </>
            ),
          },
        ]}
        caption="Protocols provide the flexibility of multiple inheritance without its complexity. They're Swift's preferred way to share behavior across types."
      />

      <h3>Protocol-Oriented Programming</h3>
      <p>
        Swift encourages protocol-oriented programming (POP), where protocols define interfaces and structs (or classes) provide implementations. This approach provides flexibility and testability while maintaining value semantics. POP is often more powerful than traditional object-oriented programming.
      </p>

      <CompareBlock
        badTitle="Class-Based Inheritance"
        goodTitle="Protocol-Oriented Design"
        bad={
          <>
            <code className="text-xs block mb-2">
              class Animal {"{"}
              <br />
              {"  "}func makeSound() {"{"} {"}"}
              <br />
              {"}"}
              <br />
              class Dog: Animal {"{"}
              <br />
              {"  "}override func makeSound() {"{"}
              <br />
              {"    "}print("Woof!")
              <br />
              {"  "}{"}"}
              <br />
              {"}"}
            </code>
            <p className="text-xs mt-2 text-warning">
              ❌ Tight coupling, only works with classes, single inheritance
            </p>
          </>
        }
        good={
          <>
            <code className="text-xs block mb-2">
              protocol Animal {"{"}
              <br />
              {"  "}func makeSound()
              <br />
              {"}"}
              <br />
              struct Dog: Animal {"{"}
              <br />
              {"  "}func makeSound() {"{"}
              <br />
              {"    "}print("Woof!")
              <br />
              {"  "}{"}"}
              <br />
              {"}"}
            </code>
            <p className="text-xs mt-2 text-success">
              ✅ Works with structs, multiple protocols, testable, flexible
            </p>
          </>
        }
      />

      <KeyTakeaways
        items={[
          "Structs are value types (copied), classes are reference types (shared). Prefer structs when possible.",
          "Inheritance allows classes to inherit from a single superclass, with override and super keywords for customization.",
          "Extensions add functionality to existing types without modifying their original definition.",
          "Protocols define blueprints of requirements that types can adopt, enabling polymorphism without inheritance.",
          "Swift's type system combines OOP concepts with value semantics, providing both flexibility and safety.",
        ]}
        mentalModel="Think of structs as independent copies (like numbers), classes as shared references (like shared documents), and protocols as contracts that types can fulfill. Swift's design encourages composition over inheritance and value types over reference types for better safety and performance."
      />

      <PageNavigation
        previous={nav?.previous ? { title: nav.previous.title, href: nav.previous.href } : undefined}
        next={nav?.next ? { title: nav.next.title, href: nav.next.href } : undefined}
      />
    </>
  );
}

