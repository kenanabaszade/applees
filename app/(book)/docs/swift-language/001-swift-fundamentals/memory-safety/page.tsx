import { DocHeader } from "@/components/docs/DocHeader";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { CompareBlock } from "@/components/docs/CompareBlock";
import { findCurrentPage } from "@/lib/nav-utils";
import { getScrapedContent } from "@/lib/use-scraped-content";

export default async function MemorySafety() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/memory-safety");
  const scraped = await getScrapedContent("memory-safety");

  const codeExample1 = `/// Demonstrates conflicting access to memory.
///
/// Memory conflicts occur when multiple accesses to the same
/// memory location overlap, causing unpredictable behavior.
///
/// ## Conflicting Access Example
/// This code causes a conflict because stepSize is accessed
/// both for reading and writing simultaneously.
var stepSize = 1

func increment(_ number: inout Int) {
    number += stepSize  // Read access to stepSize
}

increment(&stepSize)  // Write access to stepSize
// Error: Conflicting accesses to stepSize

/// ## Solution: Make a Copy
/// Create an explicit copy to avoid the conflict.
var copyOfStepSize = stepSize
increment(&copyOfStepSize)
stepSize = copyOfStepSize
// stepSize is now 2`;

  const codeExample2 = `/// Demonstrates conflicting access with in-out parameters.
///
/// Functions have long-term write access to in-out parameters,
/// which can cause conflicts if the same variable is passed
/// multiple times or accessed during the function call.
///
/// ## Multiple In-Out Parameters
/// Passing the same variable to multiple in-out parameters causes a conflict.
func balance(_ x: inout Int, _ y: inout Int) {
    let sum = x + y
    x = sum / 2
    y = sum - x
}

var playerOneScore = 42
var playerTwoScore = 30
balance(&playerOneScore, &playerTwoScore)  // OK - different locations

balance(&playerOneScore, &playerOneScore)
// Error: Conflicting accesses to playerOneScore`;

  const codeExample3 = `/// Demonstrates conflicting access in mutating methods.
///
/// Mutating methods have write access to self, which can conflict
/// with in-out parameters that reference the same instance.
///
/// ## Mutating Method with In-Out Parameter
struct Player {
    var name: String
    var health: Int
    var energy: Int
    
    static let maxHealth = 10
    
    mutating func restoreHealth() {
        health = Player.maxHealth
    }
    
    mutating func shareHealth(with teammate: inout Player) {
        balance(&teammate.health, &health)
    }
}

var oscar = Player(name: "Oscar", health: 10, energy: 10)
var maria = Player(name: "Maria", health: 5, energy: 10)

oscar.shareHealth(with: &maria)  // OK - different instances

oscar.shareHealth(with: &oscar)
// Error: Conflicting accesses to oscar`;

  const codeExample4 = `/// Demonstrates safe access to structure properties.
///
/// Swift allows overlapping access to structure properties
/// when the compiler can prove it's safe.
///
/// ## Unsafe: Global Variable
/// Accessing properties of a global variable can cause conflicts.
var holly = Player(name: "Holly", health: 10, energy: 10)
// balance(&holly.health, &holly.energy)  // Error

/// ## Safe: Local Variable
/// Accessing properties of a local variable is safe.
func someFunction() {
    var oscar = Player(name: "Oscar", health: 10, energy: 10)
    balance(&oscar.health, &oscar.energy)  // OK
}

/// The compiler can prove safety when:
/// - Structure is a local variable (not global)
/// - Only stored properties are accessed
/// - Not captured by escaping closures`;

  return (
    <>
      <DocHeader
        title="Memory Safety"
        subtitle="Understand Swift's memory safety guarantees: how conflicting access is detected and prevented to ensure predictable, safe code execution."
        chapter="001"
        readingTime="~15 min"
        progress={1.0}
      />

      <Callout kind="warning" title="Memory Safety">
        Swift prevents conflicting access to memory at compile time or runtime. Understanding these rules helps you write safe, predictable code and avoid subtle bugs.
      </Callout>

      <h2>Understanding Memory Access</h2>

      <p>
        Memory access occurs when you read from or write to a variable, property, or parameter. Swift ensures that multiple accesses to the same memory location don't conflict, preventing unpredictable behavior.
      </p>

      <ComparisonTable
        title="Memory Access Characteristics"
        headers={["Characteristic", "Read Access", "Write Access", "Impact"]}
        rows={[
          {
            feature: "Definition",
            option1: (
              <>
                Retrieves value from memory
              </>
            ),
            option2: (
              <>
                Modifies value in memory
              </>
            ),
            option3: (
              <>
                Both can conflict if overlapping
              </>
            ),
          },
          {
            feature: "Duration",
            option1: (
              <>
                Instantaneous or long-term
              </>
            ),
            option2: (
              <>
                Instantaneous or long-term
              </>
            ),
            option3: (
              <>
                Long-term accesses can overlap
              </>
            ),
          },
          {
            feature: "Conflict Condition",
            option1: (
              <>
                Read + Write to same location
              </>
            ),
            option2: (
              <>
                Write + Write to same location
              </>
            ),
            option3: (
              <>
                Must overlap in time
              </>
            ),
          },
        ]}
        caption="A conflict occurs when two accesses (not both reads) to the same memory location overlap in time."
      />

      <h2>Conflicting Access to In-Out Parameters</h2>

      <p>
        Functions have long-term write access to all in-out parameters for the duration of the function call. This can cause conflicts if you try to access the original variable or pass the same variable multiple times.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="InOutConflicts.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="MultipleInOut.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h2>Conflicting Access in Methods</h2>

      <p>
        Mutating methods have write access to <code>self</code> for the duration of the method call. This can conflict with in-out parameters that reference the same instance.
      </p>

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="MethodConflicts.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h2>Safe Access to Properties</h2>

      <p>
        Swift allows overlapping access to structure properties when the compiler can prove it's safe. This requires specific conditions to be met.
      </p>

      <DocCBlock
        code={codeExample4}
        lang="swift"
        filename="SafeAccess.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <CompareBlock
        bad={{
          title: "Unsafe: Global Variable",
          code: `var holly = Player(name: "Holly", health: 10, energy: 10)
balance(&holly.health, &holly.energy)
// Error: Conflicting access`,
        }}
        good={{
          title: "Safe: Local Variable",
          code: `func someFunction() {
    var oscar = Player(name: "Oscar", health: 10, energy: 10)
    balance(&oscar.health, &oscar.energy)  // OK
}`,
        }}
        explanation="The compiler can prove safety for local variables but not for global variables. Always prefer local variables when accessing multiple properties."
      />

      {scraped && scraped.sections.length > 0 && (
        <>
          <h2>Additional Details</h2>
          {scraped.sections.slice(0, 3).map((section, idx) => (
            <div key={idx} className="my-6">
              <h3>{section.heading}</h3>
              <p className="text-fg-muted leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
              {section.codeExamples.length > 0 && (
                <DocCBlock
                  code={section.codeExamples[0].code}
                  lang="swift"
                  showLineNumbers={true}
                />
              )}
            </div>
          ))}
        </>
      )}

      <Callout kind="info" title="Compiler Guarantees">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Swift detects conflicting access at compile time when possible</li>
          <li>Runtime detection occurs for cases the compiler can't analyze</li>
          <li>Use Thread Sanitizer for detecting conflicts in multithreaded code</li>
          <li>Local variables are safer than global variables for property access</li>
        </ul>
      </Callout>

      <KeyTakeaways
        items={[
          "Memory conflicts occur when overlapping accesses (read/write or write/write) target the same memory location.",
          "Functions have long-term write access to in-out parameters for the entire function call duration.",
          "Mutating methods have write access to self, which can conflict with in-out parameters.",
          "Swift allows overlapping property access for local variables when the compiler can prove safety.",
          "Always prefer local variables over global variables when accessing multiple properties.",
        ]}
        mentalModel="Think of memory access like reading and writing a document. If two people try to write to the same document at the same time, you get conflicts. Swift prevents this by ensuring exclusive access—only one write or coordinated reads can happen at a time."
      />

      <PageNavigation currentPage={nav} />
    </>
  );
}

