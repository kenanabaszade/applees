import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";

export default async function ObjectOrientedProgramming() {
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
        Both classes and structs can define properties, methods, initializers, and conform to protocols. However, they have fundamental differences:
      </p>

      <CodeBlock
        code={codeExample1}
        lang="swift"
        filename="ClassesAndStructs.swift"
        showLineNumbers={true}
      />

      <h3>Key Differences</h3>

      <CodeBlock
        code={codeExample5}
        lang="swift"
        filename="StructsVsClasses.swift"
        showLineNumbers={true}
      />

      <ul>
        <li><strong>Structs are value types:</strong> Copied when assigned or passed to functions</li>
        <li><strong>Classes are reference types:</strong> Shared references, not copies</li>
        <li><strong>Classes support inheritance:</strong> Can inherit from other classes</li>
        <li><strong>Identity operators:</strong> Classes can use <code>===</code> and <code>!==</code> to check if two references point to the same instance</li>
      </ul>

      <Callout kind="info" title="Swift's Preference">
        Swift's standard library and best practices favor structs over classes. Use structs by default, and only use classes when you need reference semantics or inheritance.
      </Callout>

      <h2>Inheritance</h2>

      <p>
        Inheritance allows a class to inherit characteristics from another class. A class that inherits from another is called a subclass, and the class it inherits from is called a superclass.
      </p>

      <CodeBlock
        code={codeExample2}
        lang="swift"
        filename="Inheritance.swift"
        showLineNumbers={true}
      />

      <h3>Inheritance Features</h3>
      <ul>
        <li><strong>Override:</strong> Use <code>override</code> keyword to provide custom implementation of inherited methods or properties</li>
        <li><strong>Super:</strong> Use <code>super</code> to access superclass methods and properties</li>
        <li><strong>Final:</strong> Use <code>final</code> to prevent a class, method, or property from being overridden</li>
        <li><strong>Single inheritance:</strong> Swift classes can inherit from only one superclass</li>
      </ul>

      <h2>Extensions</h2>

      <p>
        Extensions add new functionality to existing classes, structures, enumerations, or protocol types. This includes the ability to extend types for which you don't have access to the original source code.
      </p>

      <CodeBlock
        code={codeExample3}
        lang="swift"
        filename="Extensions.swift"
        showLineNumbers={true}
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
        Protocols define a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. Classes, structures, and enumerations can adopt protocols to provide actual implementations.
      </p>

      <CodeBlock
        code={codeExample4}
        lang="swift"
        filename="Protocols.swift"
        showLineNumbers={true}
      />

      <h3>Protocol Features</h3>
      <ul>
        <li><strong>Property requirements:</strong> Can specify <code>get</code> and/or <code>set</code> requirements</li>
        <li><strong>Method requirements:</strong> Define method signatures without implementations</li>
        <li><strong>Protocol as types:</strong> Protocols can be used as types in your code</li>
        <li><strong>Protocol inheritance:</strong> Protocols can inherit from other protocols</li>
        <li><strong>Protocol composition:</strong> Combine multiple protocols with <code>&</code></li>
      </ul>

      <h3>Protocol-Oriented Programming</h3>
      <p>
        Swift encourages protocol-oriented programming, where protocols define interfaces and structs (or classes) provide implementations. This approach provides flexibility and testability while maintaining value semantics.
      </p>

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
    </>
  );
}

