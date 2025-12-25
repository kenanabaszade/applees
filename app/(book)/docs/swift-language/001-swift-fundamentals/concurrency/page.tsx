import { DocHeader } from "@/components/docs/DocHeader";
import { DocCBlock } from "@/components/docs/DocCBlock";
import { Callout } from "@/components/docs/Callout";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { PageNavigation } from "@/components/docs/PageNavigation";
import { ComparisonTable } from "@/components/docs/ComparisonTable";
import { FlowChart } from "@/components/docs/FlowChart";
import { findCurrentPage } from "@/lib/nav-utils";
import { getScrapedContent } from "@/lib/use-scraped-content";

export default async function Concurrency() {
  const nav = findCurrentPage("/docs/swift-language/001-swift-fundamentals/concurrency");
  const scraped = await getScrapedContent("concurrency");

  const codeExample1 = `/// Demonstrates async/await syntax in Swift.
///
/// Swift's concurrency model uses async/await to write concurrent code
/// that's safe, efficient, and easy to understand.
///
/// ## Defining Async Functions
/// Mark functions as async to indicate they can suspend execution.
///
/// - Parameter name: The gallery name
/// - Returns: An array of photo names
func listPhotos(inGallery name: String) async -> [String] {
    // Simulate network delay
    try await Task.sleep(for: .seconds(2))
    return ["IMG001", "IMG99", "IMG0404"]
}

/// ## Calling Async Functions
/// Use await to call async functions and mark suspension points.
let photoNames = await listPhotos(inGallery: "Summer Vacation")
let sortedNames = photoNames.sorted()
let name = sortedNames[0]
let photo = await downloadPhoto(named: name)
show(photo)

/// ## Async Throwing Functions
/// Combine async with throws for error handling.
func listPhotos(inGallery name: String) async throws -> [String] {
    try await Task.sleep(for: .seconds(2))
    return ["IMG001", "IMG99", "IMG0404"]
}

let photos = try await listPhotos(inGallery: "A Rainy Weekend")`;

  const codeExample2 = `/// Demonstrates parallel execution with async-let.
///
/// Use async-let to run multiple async operations in parallel,
/// improving performance when operations don't depend on each other.
///
/// ## Sequential Execution (Slower)
/// Each download waits for the previous one to complete.
let firstPhoto = await downloadPhoto(named: photoNames[0])
let secondPhoto = await downloadPhoto(named: photoNames[1])
let thirdPhoto = await downloadPhoto(named: photoNames[2])
let photos = [firstPhoto, secondPhoto, thirdPhoto]

/// ## Parallel Execution (Faster)
/// All downloads start simultaneously and run in parallel.
async let firstPhoto = downloadPhoto(named: photoNames[0])
async let secondPhoto = downloadPhoto(named: photoNames[1])
async let thirdPhoto = downloadPhoto(named: photoNames[2])

let photos = await [firstPhoto, secondPhoto, thirdPhoto]
show(photos)

/// ## Task Groups
/// Use task groups to dynamically create parallel tasks.
await withTaskGroup(of: Data.self) { group in
    for photoName in photoNames {
        group.addTask {
            await downloadPhoto(named: photoName)
        }
    }
}`;

  return (
    <>
      <DocHeader
        title="Concurrency"
        subtitle="Master Swift's modern concurrency model: async/await, tasks, actors, and structured concurrency for safe and efficient concurrent programming."
        chapter="001"
        readingTime="~25 min"
        progress={1.0}
      />

      <Callout kind="note" title="Modern Concurrency">
        Swift's concurrency model, introduced in Swift 5.5, provides a safe and efficient way to write concurrent code. It eliminates many common concurrency bugs like data races and deadlocks through structured concurrency and actor isolation.
      </Callout>

      <h2>Async/Await</h2>

      <p>
        The async/await syntax makes asynchronous code look and behave like synchronous code, making it easier to write and understand. It's built on top of Swift's structured concurrency model.
      </p>

      <DocCBlock
        code={codeExample1}
        lang="swift"
        filename="AsyncAwait.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <ComparisonTable
        title="Async vs Synchronous Code"
        headers={["Aspect", "Synchronous", "Async/Await", "Benefits"]}
        rows={[
          {
            feature: "Execution",
            option1: (
              <>
                Blocks until complete
              </>
            ),
            option2: (
              <>
                Can suspend and resume
              </>
            ),
            option3: (
              <>
                Non-blocking, better performance
              </>
            ),
          },
          {
            feature: "Syntax",
            option1: (
              <>
                <code className="text-xs">func fetch() {"->"} Data</code>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">func fetch() async {"->"} Data</code>
              </>
            ),
            option3: (
              <>
                Clear, readable, maintainable
              </>
            ),
          },
          {
            feature: "Error Handling",
            option1: (
              <>
                <code className="text-xs">throws</code>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">async throws</code>
              </>
            ),
            option3: (
              <>
                Combines async and error handling
              </>
            ),
          },
          {
            feature: "Calling",
            option1: (
              <>
                <code className="text-xs">let data = fetch()</code>
              </>
            ),
            option2: (
              <>
                <code className="text-xs">let data = await fetch()</code>
              </>
            ),
            option3: (
              <>
                Explicit suspension points
              </>
            ),
          },
        ]}
        caption="Async/await makes concurrent code as readable as synchronous code while providing better performance and safety."
      />

      <h2>Parallel Execution</h2>

      <p>
        Swift allows you to run multiple async operations in parallel, significantly improving performance when operations are independent of each other.
      </p>

      <DocCBlock
        code={codeExample2}
        lang="swift"
        filename="ParallelExecution.swift"
        showLineNumbers={true}
        showDocumentation={true}
      />

      <FlowChart
        title="Async Execution Flow"
        caption="How async/await manages execution flow and suspension points"
        width={650}
        height={450}
        nodes={[
          { id: "start", label: "Call async function", type: "start", position: { x: 325, y: 50 } },
          { id: "suspend", label: "Hit await?", type: "decision", position: { x: 325, y: 150 } },
          { id: "other", label: "Other code runs", type: "process", position: { x: 150, y: 250 } },
          { id: "resume", label: "Async completes", type: "process", position: { x: 500, y: 250 } },
          { id: "continue", label: "Continue execution", type: "process", position: { x: 325, y: 320 } },
          { id: "end", label: "Function returns", type: "end", position: { x: 325, y: 400 } },
        ]}
        edges={[
          { from: "start", to: "suspend" },
          { from: "suspend", to: "other", label: "Yes" },
          { from: "suspend", to: "continue", label: "No" },
          { from: "other", to: "resume" },
          { from: "resume", to: "continue" },
          { from: "continue", to: "end" },
        ]}
      />

      {scraped && scraped.sections.length > 0 && (
        <>
          <h2>Additional Concepts</h2>
          {scraped.sections.slice(0, 5).map((section, idx) => (
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

      <KeyTakeaways
        items={[
          "Async/await makes concurrent code readable and maintainable, similar to synchronous code.",
          "Use await to mark suspension points where execution can pause and resume.",
          "async-let enables parallel execution of independent async operations.",
          "Task groups allow dynamic creation of parallel tasks.",
          "Swift's structured concurrency prevents common concurrency bugs like data races.",
        ]}
        mentalModel="Think of async functions as functions that can pause their work, let other code run, and then resume. The await keyword marks where these pauses can happen. This allows your app to stay responsive while waiting for slow operations like network requests."
      />

      <PageNavigation currentPage={nav} />
    </>
  );
}

