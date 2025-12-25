import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { FlowChart } from "@/components/docs/FlowChart";
import { findCurrentPage } from "@/lib/nav-utils";

export default async function ControlFlow() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/control-flow");
  const codeExample1 = `/// Demonstrates conditional statements in Swift.
///
/// Swift provides several ways to make decisions in your code,
/// including if-else statements, optional binding, and guard statements.
///
/// ## Basic If-Else
/// Simple conditional execution based on a Boolean expression.
let temperature = 30
if temperature > 25 {
    print("It's hot outside")
} else {
    print("It's cool outside")
}

/// ## Multiple Conditions
/// Chain multiple conditions using else-if.
///
/// - Parameter score: A numeric score value
let score = 85
if score >= 90 {
    print("Excellent!")
} else if score >= 80 {
    print("Good job!")
} else if score >= 70 {
    print("Not bad")
} else {
    print("Keep trying!")
}

/// ## Optional Binding with If-Let
/// Safely unwrap optionals and use their values conditionally.
///
/// - Parameter optionalName: An optional string that may contain a name
var optionalName: String? = "Alice"
if let name = optionalName {
    print("Hello, \\(name)!")
} else {
    print("No name provided")
}

/// ## Guard Statement
/// Early exit pattern for cleaner code flow.
///
/// - Parameter name: An optional string that may contain a name
///
/// > Note: Guard statements require an early return or throw in the else clause.
func greet(name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    print("Hello, \\(name)!")
}`;

  const codeExample2 = `/// Demonstrates Swift's powerful switch statement.
///
/// Swift's switch statement is more powerful than in many languages.
/// It supports pattern matching, ranges, tuples, and doesn't require
/// explicit break statements.
///
/// ## Switch with Cases
/// Match against specific string values.
///
/// - Parameter grade: A letter grade string
let grade = "A"
switch grade {
case "A":
    print("Excellent!")
case "B":
    print("Good job!")
case "C":
    print("Average")
case "D":
    print("Below average")
default:
    print("Needs improvement")
}

/// ## Switch with Ranges
/// Match against numeric ranges using the range operators.
///
/// - Parameter score: A numeric score value
let score = 85
switch score {
case 90...100:
    print("A")
case 80..<90:
    print("B")
case 70..<80:
    print("C")
default:
    print("F")
}

/// ## Switch with Tuples
/// Match against tuple values with pattern matching.
///
/// - Parameter point: A tuple representing (x, y) coordinates
///
/// > Note: The underscore (_) is a wildcard that matches any value.
let point = (1, 1)
switch point {
case (0, 0):
    print("Origin")
case (_, 0):
    print("On x-axis")
case (0, _):
    print("On y-axis")
case (-2...2, -2...2):
    print("Inside the box")
default:
    print("Outside the box")
}`;

  const codeExample3 = `/// Demonstrates different types of loops in Swift.
///
/// Swift provides several loop constructs for iterating over collections
/// and repeating code execution.
///
/// ## For-In Loop with Range
/// Iterate over a range of numbers.
for number in 1...5 {
    print(number)  // 1, 2, 3, 4, 5
}

/// ## For-In Loop with Array
/// Iterate over array elements directly.
let names = ["Alice", "Bob", "Charlie"]
for name in names {
    print("Hello, \\(name)!")
}

/// ## For-In Loop with Dictionary
/// Iterate over key-value pairs in a dictionary.
let scores = ["Alice": 95, "Bob": 87, "Charlie": 92]
for (name, score) in scores {
    print("\\(name): \\(score)")
}

/// ## For-In Loop with Indices
/// Iterate over array indices when you need both index and value.
///
/// > Note: Consider using \`enumerated()\` for a cleaner approach.
let fruits = ["Apple", "Banana", "Orange"]
for index in 0..<fruits.count {
    print("\\(index): \\(fruits[index])")
}

/// ## While Loop
/// Execute code while a condition is true.
///
/// > Warning: Ensure the condition eventually becomes false to avoid infinite loops.
var count = 5
while count > 0 {
    print(count)
    count -= 1
}
// Output: 5, 4, 3, 2, 1

/// ## Repeat-While Loop
/// Execute code at least once, then check the condition.
///
/// > Note: The condition is checked after each iteration, unlike while loops.
var number = 0
repeat {
    print(number)
    number += 1
} while number < 5`;

  const codeExample4 = `/// Demonstrates control transfer statements in Swift.
///
/// Control transfer statements change the order of execution in your code,
/// allowing you to skip iterations, exit loops early, or transfer control
/// to labeled statements.
///
/// ## Continue Statement
/// Skip to the next iteration of a loop.
///
/// > Note: Continue only affects the innermost loop.
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in numbers {
    if number % 2 == 0 {
        continue  // Skip even numbers
    }
    print(number)  // Prints: 1, 3, 5, 7, 9
}

/// ## Break Statement
/// Exit a loop immediately.
///
/// > Warning: Break only exits the innermost loop. Use labeled statements for nested loops.
for number in numbers {
    if number > 5 {
        break  // Exit when number > 5
    }
    print(number)  // Prints: 1, 2, 3, 4, 5
}

/// ## Labeled Statements
/// Use labels to control which loop to break or continue.
///
/// - Parameter outerLoop: Label for the outer loop
/// - Parameter innerLoop: Label for the inner loop
outerLoop: for i in 1...3 {
    innerLoop: for j in 1...3 {
        if i * j == 6 {
            break outerLoop  // Break outer loop
        }
        print("i: \\(i), j: \\(j)")
    }
}`;

  return (
    <>
      <DocHeader
        title="Control Flow"
        subtitle="Master Swift's control flow statements: conditionals (if, else, guard, if let), switch statements, and loops (for, while)."
        chapter="001"
        readingTime="~12 min"
        progress={0.6}
      />

      <Callout kind="note" title="Control Flow">
        Control flow statements determine the order in which your code executes. Swift provides powerful and expressive control flow constructs that make your code both readable and safe.
      </Callout>

      <h2>Conditionals</h2>

      <p>
        Conditionals allow your code to make decisions and execute different code paths based on conditions.
      </p>

      <h3>if, else, and else if</h3>

      <p>
        Conditional statements allow your code to make decisions and execute different code paths based on conditions. Swift provides several ways to handle conditionals, each suited for different scenarios.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="Conditionals.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Conditional Statements Comparison"
        headers={["Statement", "Use Case", "Syntax", "Best For"]}
        rows={[
          {
            feature: "if-else",
            option1: (
              <>
                Simple true/false decisions
                <br />
                <span className="text-fg-subtle text-xs">
                  One or two branches
                </span>
              </>
            ),
            option2: (
              <>
                <code className="text-accent text-xs">if condition {"{"} {"}"} else {"{"} {"}"}</code>
              </>
            ),
            option3: (
              <>
                Simple conditions, early returns
              </>
            ),
          },
          {
            feature: "if-let",
            option1: (
              <>
                Optional unwrapping
                <br />
                <span className="text-fg-subtle text-xs">
                  Safely unwrap and use optional
                </span>
              </>
            ),
            option2: (
              <>
                <code className="text-accent text-xs">if let value = optional {"{"} {"}"}</code>
              </>
            ),
            option3: (
              <>
                Handling optionals, safe unwrapping
              </>
            ),
          },
          {
            feature: "guard",
            option1: (
              <>
                Early exit pattern
                <br />
                <span className="text-fg-subtle text-xs">
                  Validate and exit early if invalid
                </span>
              </>
            ),
            option2: (
              <>
                <code className="text-accent text-xs">guard condition else {"{"} return {"}"}</code>
              </>
            ),
            option3: (
              <>
                Input validation, preconditions
              </>
            ),
          },
          {
            feature: "switch",
            option1: (
              <>
                Multiple cases, pattern matching
                <br />
                <span className="text-fg-subtle text-xs">
                  Exhaustive, powerful pattern matching
                </span>
              </>
            ),
            option2: (
              <>
                <code className="text-accent text-xs">switch value {"{"} case .x: {"}"}</code>
              </>
            ),
            option3: (
              <>
                Enums, multiple values, ranges
              </>
            ),
          },
        ]}
        caption="Choose the right conditional based on your needs. guard is excellent for validation, if-let for optionals, and switch for multiple cases."
      />

      <h3>Optional Binding: if let</h3>
      <p>
        Swift's <code>if let</code> syntax safely unwraps optionals. If the optional has a value, it's unwrapped and available in the <code>if</code> block. If it's <code>nil</code>, the <code>else</code> block executes.
      </p>

      <h3>guard Statement</h3>
      <p>
        The <code>guard</code> statement provides an early exit mechanism. It requires a condition to be true to continue execution. If the condition is false, the <code>else</code> block must exit the current scope (return, break, continue, or throw).
      </p>

      <Callout kind="info" title="Guard vs if let">
        Use <code>guard</code> when you want early exit from a function or loop. Use <code>if let</code> when you want to handle both the nil and non-nil cases within the same scope.
      </Callout>

      <h2>switch Statements</h2>

      <p>
        Swift's <code>switch</code> statement is more powerful than in many other languages. It supports pattern matching, ranges, tuples, and doesn't require explicit <code>break</code> statements.
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="Switch.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h3>Key Features of Swift switch</h3>
      <ul>
        <li><strong>No fallthrough:</strong> Cases don't fall through to the next case (unlike C/Java)</li>
        <li><strong>Pattern matching:</strong> Can match ranges, tuples, and complex patterns</li>
        <li><strong>Must be exhaustive:</strong> All possible values must be handled, or include a <code>default</code> case</li>
        <li><strong>Value binding:</strong> Can extract values from matched patterns</li>
      </ul>

      <h2>Loops</h2>

      <p>
        Loops allow you to execute code repeatedly. Swift provides several loop constructs:
      </p>

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="Loops.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h3>for-in Loop</h3>
      <p>
        The <code>for-in</code> loop iterates over sequences like ranges, arrays, dictionaries, and strings. It's the most common loop type in Swift.
      </p>

      <h3>while Loop</h3>
      <p>
        The <code>while</code> loop continues executing as long as a condition is true. The condition is checked before each iteration.
      </p>

      <h3>repeat-while Loop</h3>
      <p>
        Similar to <code>do-while</code> in other languages, <code>repeat-while</code> executes the loop body at least once, then checks the condition.
      </p>

      <h2>Control Transfer Statements</h2>

      <p>
        Control transfer statements change the order of execution in your code:
      </p>

      <DocCBlock
        code={codeExample4}
        lang="swift"
        filename="ControlTransfer.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ul>
        <li><strong>continue:</strong> Skips the rest of the current loop iteration and continues with the next iteration</li>
        <li><strong>break:</strong> Exits the current loop or switch statement immediately</li>
        <li><strong>return:</strong> Exits a function and optionally returns a value</li>
        <li><strong>fallthrough:</strong> In switch statements, explicitly falls through to the next case</li>
      </ul>

      <KeyTakeaways
        items={[
          "Use if-else for simple conditionals, guard for early exits, and if let for optional unwrapping.",
          "Swift's switch statement is powerful, supporting pattern matching, ranges, and tuples without fallthrough.",
          "for-in loops are ideal for iterating over collections and ranges.",
          "while and repeat-while loops execute code repeatedly based on conditions.",
          "Control transfer statements (continue, break, return) allow fine-grained control over execution flow.",
        ]}
        mentalModel="Think of control flow as decision trees: conditionals choose paths, loops repeat actions, and control transfer statements redirect execution. Swift's design ensures these constructs are both expressive and safe."
      />

      <PageNavigation
        previous={nav?.previous ? { title: nav.previous.title, href: nav.previous.href } : undefined}
        next={nav?.next ? { title: nav.next.title, href: nav.next.href } : undefined}
      />
    </>
  );
}

