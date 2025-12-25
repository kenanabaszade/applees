import { DocHeader } from "@/components/docs/DocHeader";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";

export default async function ControlFlow() {
  const codeExample1 = `// Basic if-else
let temperature = 30
if temperature > 25 {
    print("It's hot outside")
} else {
    print("It's cool outside")
}

// Multiple conditions
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

// Optional binding with if let
var optionalName: String? = "Alice"
if let name = optionalName {
    print("Hello, \\(name)!")
} else {
    print("No name provided")
}

// Guard statement - early exit
func greet(name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    print("Hello, \\(name)!")
}`;

  const codeExample2 = `// Switch with cases
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

// Switch with ranges
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

// Switch with tuples
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

  const codeExample3 = `// For-in loop with range
for number in 1...5 {
    print(number)  // 1, 2, 3, 4, 5
}

// For-in loop with array
let names = ["Alice", "Bob", "Charlie"]
for name in names {
    print("Hello, \\(name)!")
}

// For-in loop with dictionary
let scores = ["Alice": 95, "Bob": 87, "Charlie": 92]
for (name, score) in scores {
    print("\\(name): \\(score)")
}

// For-in loop with indices
let fruits = ["Apple", "Banana", "Orange"]
for index in 0..<fruits.count {
    print("\\(index): \\(fruits[index])")
}

// While loop
var count = 5
while count > 0 {
    print(count)
    count -= 1
}
// Output: 5, 4, 3, 2, 1

// Repeat-while loop (executes at least once)
var number = 0
repeat {
    print(number)
    number += 1
} while number < 5`;

  const codeExample4 = `// Control transfer statements
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Continue - skip to next iteration
for number in numbers {
    if number % 2 == 0 {
        continue  // Skip even numbers
    }
    print(number)  // Prints: 1, 3, 5, 7, 9
}

// Break - exit loop early
for number in numbers {
    if number > 5 {
        break  // Exit when number > 5
    }
    print(number)  // Prints: 1, 2, 3, 4, 5
}

// Labeled statements
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

      <CodeBlock
        code={codeExample1}
        lang="swift"
        filename="Conditionals.swift"
        showLineNumbers={true}
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

      <CodeBlock
        code={codeExample2}
        lang="swift"
        filename="Switch.swift"
        showLineNumbers={true}
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

      <CodeBlock
        code={codeExample3}
        lang="swift"
        filename="Loops.swift"
        showLineNumbers={true}
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

      <CodeBlock
        code={codeExample4}
        lang="swift"
        filename="ControlTransfer.swift"
        showLineNumbers={true}
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
    </>
  );
}

