/// A stack data structure that stores integers.
///
/// IntStack provides a simple LIFO (Last In, First Out) data structure
/// for storing integer values. You can push items onto the stack and
/// pop them off in reverse order.
///
/// ## Example
///
/// ```swift
/// var stack = IntStack()
/// stack.push(1)
/// stack.push(2)
/// print(stack.pop()) // Prints "2"
/// ```
struct IntStack {
    /// The underlying storage for stack items.
    private var items: [Int] = []
    
    /// Adds a new item to the top of the stack.
    ///
    /// - Parameter item: The integer value to add to the stack
    ///
    /// ## Complexity
    /// O(1) on average
    mutating func push(_ item: Int) {
        items.append(item)
    }
    
    /// Removes and returns the top item from the stack.
    ///
    /// - Returns: The integer value that was removed from the top of the stack
    /// - Throws: An error if the stack is empty
    ///
    /// > Warning: Calling `pop()` on an empty stack will cause a runtime error.
    ///
    /// > Note: Consider using `safePop()` for a safer alternative that returns an optional.
    mutating func pop() -> Int {
        return items.removeLast()
    }
    
    /// Returns the number of items in the stack.
    ///
    /// - Returns: The count of items currently in the stack
    var count: Int {
        return items.count
    }
}

