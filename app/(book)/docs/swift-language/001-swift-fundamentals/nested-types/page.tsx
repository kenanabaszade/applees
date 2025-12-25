import { DocHeader } from "@/components/docs/DocHeader";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { findCurrentPage } from "@/lib/nav-utils";
import { getScrapedContent } from "@/lib/use-scraped-content";

export default async function NestedTypes() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/nested-types");
  const scraped = await getScrapedContent("nested-types");

  const codeExample1 = `/// Demonstrates nested types in Swift.
///
/// Nested types allow you to define types within the context of another type,
/// providing better organization and namespace management.
///
/// ## Nested Enumerations
/// Define enumerations inside structures or classes.
struct BlackjackCard {
    // Nested Suit enumeration
    enum Suit: Character {
        case spades = "♠"
        case hearts = "♥"
        case diamonds = "♦"
        case clubs = "♣"
    }
    
    // Nested Rank enumeration
    enum Rank: Int {
        case two = 2, three, four, five, six, seven, eight, nine, ten
        case jack, queen, king, ace
        
        // Nested structure within nested enum
        struct Values {
            let first: Int
            let second: Int?
        }
        
        var values: Values {
            switch self {
            case .ace:
                return Values(first: 1, second: 11)
            case .jack, .queen, .king:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }
    
    // BlackjackCard properties
    let rank: Rank
    let suit: Suit
    
    var description: String {
        var output = "suit is \\(suit.rawValue),"
        output += " value is \\(rank.values.first)"
        if let second = rank.values.second {
            output += " or \\(second)"
        }
        return output
    }
}

/// ## Using Nested Types
/// Access nested types using dot notation.
let theAceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
print("theAceOfSpades: \\(theAceOfSpades.description)")
// Prints "theAceOfSpades: suit is ♠, value is 1 or 11"

/// ## Referring to Nested Types
/// Use the full path when using nested types outside their context.
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
let aceRank = BlackjackCard.Rank.ace`;

  return (
    <>
      <DocHeader
        title="Nested Types"
        subtitle="Learn how to define types within other types to create better organized, more maintainable code with clear namespaces."
        chapter="001"
        readingTime="~8 min"
        progress={1.0}
      />

      <Callout kind="note" title="Nested Types">
        Nested types allow you to define supporting enumerations, classes, and structures within the context of the type they support. This creates logical groupings and prevents namespace pollution.
      </Callout>

      <h2>What are Nested Types?</h2>

      <p>
        Nested types are types defined within the context of another type. They're useful for organizing related types together and creating clear, logical groupings. Swift allows you to nest enumerations, structures, and classes within other enumerations, structures, and classes.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="NestedTypes.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Nested Types vs Separate Types"
        headers={["Aspect", "Nested Types", "Separate Types", "When to Use"]}
        rows={[
          {
            feature: "Organization",
            option1: (
              <>
                <span className="text-fg">Logical grouping</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Related types together
                </span>
              </>
            ),
            option2: (
              <>
                <span className="text-fg-muted">Separate files</span>
                <br />
                <span className="text-fg-subtle text-xs">
                  Types in different locations
                </span>
              </>
            ),
            option3: (
              <>
                Nested: When types are only used by parent type
                <br />
                Separate: When types are used independently
              </>
            ),
          },
          {
            feature: "Namespace",
            option1: (
              <>
                <code className="text-xs">ParentType.NestedType</code>
                <br />
                <span className="text-fg-subtle text-xs">
                  Clear namespace
                </span>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">NestedType</code>
                <br />
                <span className="text-fg-subtle text-xs">
                  Global namespace
                </span>
              </>
            ),
            option3: (
              <>
                Nested: Prevents name conflicts
              </>
            ),
          },
          {
            feature: "Access",
            option1: (
              <>
                <code className="text-xs">BlackjackCard.Suit</code>
                <br />
                <span className="text-fg-subtle text-xs">
                  Full path required outside context
                </span>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">Suit</code>
                <br />
                <span className="text-fg-subtle text-xs">
                  Direct access
                </span>
              </>
            ),
            option3: (
              <>
                Nested: Better encapsulation
              </>
            ),
          },
        ]}
        caption="Use nested types when the nested type is only meaningful in the context of the parent type. Use separate types when the type has broader utility."
      />

      <h2>Real-World Examples</h2>

      <p>
        Nested types are commonly used in Swift for organizing related functionality:
      </p>

      <ul>
        <li><strong>UI Components:</strong> <code>UIView.AnimationOptions</code>, <code>UIButton.ButtonType</code></li>
        <li><strong>Networking:</strong> <code>URLRequest.CachePolicy</code>, <code>HTTPURLResponse.StatusCode</code></li>
        <li><strong>Data Models:</strong> Card games, board games, configuration structures</li>
        <li><strong>Error Types:</strong> <code>NetworkError.Authentication</code>, <code>NetworkError.Server</code></li>
      </ul>

      {scraped && scraped.sections.length > 0 && (
        <>
          <h2>Additional Details</h2>
          {scraped.sections.map((section, idx) => (
            <div key={idx} className="my-6">
              <h3>{section.heading}</h3>
              <p className="text-fg-muted leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </>
      )}

      <Callout kind="info" title="Best Practices">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use nested types when the nested type is only meaningful within its parent</li>
          <li>Nest enumerations that represent options or states of the parent type</li>
          <li>Use nested structures for helper types that support the parent type</li>
          <li>Avoid deep nesting (more than 2-3 levels) as it can hurt readability</li>
        </ul>
      </Callout>

      <KeyTakeaways
        items={[
          "Nested types are defined within the context of another type (enum, struct, or class).",
          "They provide logical organization and prevent namespace pollution.",
          "Access nested types using dot notation: ParentType.NestedType.",
          "Use nested types when the nested type is only meaningful in the context of its parent.",
          "Common use cases include error types, configuration options, and helper structures.",
        ]}
        mentalModel="Think of nested types as organizing related types into logical groups, similar to how you organize files into folders. They create clear boundaries and prevent naming conflicts while keeping related code together."
      />

      <PageNavigation currentPage={nav} />
    </>
  );
}

