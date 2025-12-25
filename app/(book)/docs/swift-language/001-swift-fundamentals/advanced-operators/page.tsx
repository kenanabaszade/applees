import { DocHeader } from "@/components/docs/DocHeader";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { findCurrentPage } from "@/lib/nav-utils";
import { getScrapedContent } from "@/lib/use-scraped-content";

export default async function AdvancedOperators() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/advanced-operators");
  const scraped = await getScrapedContent("advanced-operators");

  const codeExample1 = `/// Demonstrates bitwise operators in Swift.
///
/// Bitwise operators manipulate individual bits within data structures.
/// They're useful for low-level programming, graphics, and data encoding.
///
/// ## Bitwise NOT Operator (~)
/// Inverts all bits in a number.
let initialBits: UInt8 = 0b00001111  // 15 in decimal
let invertedBits = ~initialBits     // 240 in decimal (11110000)

/// ## Bitwise AND Operator (&)
/// Returns 1 only if both bits are 1.
let firstSixBits: UInt8 = 0b11111100
let lastSixBits: UInt8  = 0b00111111
let middleFourBits = firstSixBits & lastSixBits  // 00111100 (60)

/// ## Bitwise OR Operator (|)
/// Returns 1 if either bit is 1.
let someBits: UInt8 = 0b10110010
let moreBits: UInt8 = 0b01011110
let combinedBits = someBits | moreBits  // 11111110 (254)

/// ## Bitwise XOR Operator (^)
/// Returns 1 if bits are different.
let firstBits: UInt8 = 0b00010100
let otherBits: UInt8 = 0b00000101
let outputBits = firstBits ^ otherBits  // 00010001 (17)`;

  const codeExample2 = `/// Demonstrates bitwise shift operators.
///
/// Shift operators move bits left or right, effectively
/// multiplying or dividing by powers of 2.
///
/// ## Left Shift (<<)
/// Moves bits left, effectively multiplying by 2.
let shiftBits: UInt8 = 4   // 00000100
shiftBits << 1             // 00001000 (8)
shiftBits << 2             // 00010000 (16)
shiftBits << 5             // 10000000 (128)

/// ## Right Shift (>>)
/// Moves bits right, effectively dividing by 2.
shiftBits >> 2             // 00000001 (1)

/// ## Practical Example: Color Decomposition
/// Extract RGB components from a color value.
let pink: UInt32 = 0xCC6699
let redComponent = (pink & 0xFF0000) >> 16    // 0xCC (204)
let greenComponent = (pink & 0x00FF00) >> 8   // 0x66 (102)
let blueComponent = pink & 0x0000FF           // 0x99 (153)`;

  const codeExample3 = `/// Demonstrates overflow operators.
///
/// Overflow operators allow integer overflow behavior
/// instead of throwing errors.
///
/// ## Overflow Addition (&+)
/// Wraps around when exceeding maximum value.
var unsignedOverflow = UInt8.max  // 255
unsignedOverflow = unsignedOverflow &+ 1  // 0 (wraps around)

/// ## Overflow Subtraction (&-)
/// Wraps around when going below minimum value.
var unsignedOverflow = UInt8.min  // 0
unsignedOverflow = unsignedOverflow &- 1  // 255 (wraps around)

/// ## Signed Integer Overflow
/// Signed integers also wrap around.
var signedOverflow = Int8.min  // -128
signedOverflow = signedOverflow &- 1  // 127 (wraps around)`;

  const codeExample4 = `/// Demonstrates custom operator overloading.
///
/// Swift allows you to define custom implementations
/// of existing operators for your types.
///
/// ## Custom Binary Operator
struct Vector2D {
    var x = 0.0, y = 0.0
}

extension Vector2D {
    static func + (left: Vector2D, right: Vector2D) -> Vector2D {
        return Vector2D(x: left.x + right.x, y: left.y + right.y)
    }
}

let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector is (5.0, 5.0)

/// ## Prefix Unary Operator
extension Vector2D {
    static prefix func - (vector: Vector2D) -> Vector2D {
        return Vector2D(x: -vector.x, y: -vector.y)
    }
}

let positive = Vector2D(x: 3.0, y: 4.0)
let negative = -positive  // (-3.0, -4.0)

/// ## Compound Assignment Operator
extension Vector2D {
    static func += (left: inout Vector2D, right: Vector2D) {
        left = left + right
    }
}

var original = Vector2D(x: 1.0, y: 2.0)
let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
original += vectorToAdd
// original is now (4.0, 6.0)`;

  return (
    <>
      <DocHeader
        title="Advanced Operators"
        subtitle="Master Swift's advanced operators: bitwise operations, overflow handling, and custom operator overloading for powerful, expressive code."
        chapter="001"
        readingTime="~20 min"
        progress={1.0}
      />

      <Callout kind="note" title="Advanced Operators">
        Swift provides powerful operators beyond basic arithmetic. Understanding bitwise operations, overflow handling, and operator overloading enables you to write more expressive and efficient code.
      </Callout>

      <h2>Bitwise Operators</h2>

      <p>
        Bitwise operators enable you to manipulate individual bits within data structures. They're essential for low-level programming, graphics, device drivers, and data encoding/decoding.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="BitwiseOperators.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Bitwise Operators"
        headers={["Operator", "Name", "Description", "Example"]}
        rows={[
          {
            feature: "~",
            option1: (
              <>
                Bitwise NOT
              </>
            ),
            option2: (
              <>
                Inverts all bits
              </>
            ),
            option3: (
              <>
                <code className="text-xs">~0b00001111 = 0b11110000</code>
              </>
            ),
          },
          {
            feature: "&",
            option1: (
              <>
                Bitwise AND
              </>
            ),
            option2: (
              <>
                Returns 1 if both bits are 1
              </>
            ),
            option3: (
              <>
                <code className="text-xs">0b1010 & 0b1100 = 0b1000</code>
              </>
            ),
          },
          {
            feature: "|",
            option1: (
              <>
                Bitwise OR
              </>
            ),
            option2: (
              <>
                Returns 1 if either bit is 1
              </>
            ),
            option3: (
              <>
                <code className="text-xs">0b1010 | 0b1100 = 0b1110</code>
              </>
            ),
          },
          {
            feature: "^",
            option1: (
              <>
                Bitwise XOR
              </>
            ),
            option2: (
              <>
                Returns 1 if bits differ
              </>
            ),
            option3: (
              <>
                <code className="text-xs">0b1010 ^ 0b1100 = 0b0110</code>
              </>
            ),
          },
        ]}
        caption="Bitwise operators work at the bit level, enabling precise control over data representation."
      />

      <h2>Bitwise Shift Operators</h2>

      <p>
        Shift operators move bits left or right, effectively multiplying or dividing by powers of 2. They're useful for efficient arithmetic and data manipulation.
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="ShiftOperators.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <h2>Overflow Operators</h2>

      <p>
        By default, Swift prevents integer overflow by throwing errors. Overflow operators allow you to opt into overflow behavior when you specifically need it.
      </p>

      <DocCBlock
        code={codeExample3}
        lang="swift"
        filename="OverflowOperators.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Overflow Operators"
        headers={["Operator", "Name", "Behavior", "Use Case"]}
        rows={[
          {
            feature: "&+",
            option1: (
              <>
                Overflow Addition
              </>
            ),
            option2: (
              <>
                Wraps around on overflow
              </>
            ),
            option3: (
              <>
                When you need wrapping behavior
              </>
            ),
          },
          {
            feature: "&-",
            option1: (
              <>
                Overflow Subtraction
              </>
            ),
            option2: (
              <>
                Wraps around on underflow
              </>
            ),
            option3: (
              <>
                Circular arithmetic
              </>
            ),
          },
          {
            feature: "&*",
            option1: (
              <>
                Overflow Multiplication
              </>
            ),
            option2: (
              <>
                Wraps around on overflow
              </>
            ),
            option3: (
              <>
                Large number calculations
              </>
            ),
          },
        ]}
        caption="Overflow operators provide explicit control over integer overflow behavior."
      />

      <h2>Custom Operator Overloading</h2>

      <p>
        Swift allows you to define custom implementations of existing operators for your types. This makes your code more expressive and intuitive.
      </p>

      <DocCBlock
        code={codeExample4}
        lang="swift"
        filename="OperatorOverloading.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      {scraped && scraped.sections.length > 0 && (
        <>
          <h2>Operator Precedence and Associativity</h2>
          {scraped.sections
            .filter((s: { heading: string }) => s.heading.toLowerCase().includes("precedence") || s.heading.toLowerCase().includes("associativity"))
            .slice(0, 1)
            .map((section: { heading: string; content: string; codeExamples: Array<{ code: string; language?: string }> }, idx: number) => (
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

      <Callout kind="info" title="Best Practices">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use bitwise operators for low-level operations, flags, and data encoding</li>
          <li>Overflow operators should be used sparingly and with clear intent</li>
          <li>Operator overloading should make code more readable, not less</li>
          <li>Follow Swift's operator precedence rules to avoid unexpected behavior</li>
          <li>Document custom operators clearly for other developers</li>
        </ul>
      </Callout>

      <KeyTakeaways
        items={[
          "Bitwise operators (~, &, |, ^) manipulate individual bits for low-level operations.",
          "Shift operators (<<, >>) efficiently multiply/divide by powers of 2.",
          "Overflow operators (&+, &-, &*) allow explicit integer overflow behavior.",
          "Custom operator overloading makes code more expressive for domain-specific types.",
          "Operator precedence and associativity determine evaluation order in expressions.",
        ]}
        mentalModel="Think of bitwise operators as tools for working with data at its most fundamental level—the individual bits. They're like having fine-grained control over data representation, enabling efficient operations that would be slow or impossible with higher-level abstractions."
      />

      <PageNavigation
        previous={nav?.previous ? { title: nav.previous.title, href: nav.previous.href } : undefined}
        next={nav?.next ? { title: nav.next.title, href: nav.next.href } : undefined}
      />
    </>
  );
}

