/**
 * Parser for DocC-style documentation comments
 * DocC uses Markdown syntax in Swift documentation comments
 */

export interface DocCComment {
  summary?: string;
  parameters?: Array<{
    name: string;
    description: string;
  }>;
  returns?: string;
  throws?: string;
  discussion?: string;
  example?: string;
  note?: string[];
  warning?: string[];
  important?: string[];
  seeAlso?: string[];
}

/**
 * Parses a DocC-style documentation comment from Swift code
 * 
 * Example:
 * ```swift
 * /// Returns the sum of two integers.
 * ///
 * /// - Parameters:
 * ///   - a: The first integer
 * ///   - b: The second integer
 * /// - Returns: The sum of a and b
 * func add(_ a: Int, _ b: Int) -> Int {
 *     return a + b
 * }
 * ```
 */
export function parseDocCComment(comment: string): DocCComment {
  const result: DocCComment = {};
  const lines = comment.split('\n').map(line => line.trim());
  
  let currentSection: string | null = null;
  let currentContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines and comment markers
    if (!line || line.startsWith('///') || line.startsWith('//')) {
      continue;
    }
    
    // Check for parameter
    if (line.match(/^- Parameters?:/i)) {
      currentSection = 'parameters';
      result.parameters = [];
      continue;
    }
    
    // Check for parameter item
    if (line.match(/^- (\w+):/)) {
      const match = line.match(/^- (\w+):\s*(.+)/);
      if (match && result.parameters) {
        result.parameters.push({
          name: match[1],
          description: match[2] || '',
        });
      }
      continue;
    }
    
    // Check for returns
    if (line.match(/^- Returns?:/i)) {
      currentSection = 'returns';
      currentContent = [];
      continue;
    }
    
    // Check for throws
    if (line.match(/^- Throws?:/i)) {
      currentSection = 'throws';
      currentContent = [];
      continue;
    }
    
    // Check for note
    if (line.match(/^> Note:/i)) {
      currentSection = 'note';
      if (!result.note) result.note = [];
      result.note.push(line.replace(/^> Note:\s*/i, ''));
      continue;
    }
    
    // Check for warning
    if (line.match(/^> Warning:/i)) {
      currentSection = 'warning';
      if (!result.warning) result.warning = [];
      result.warning.push(line.replace(/^> Warning:\s*/i, ''));
      continue;
    }
    
    // Check for important
    if (line.match(/^> Important:/i)) {
      currentSection = 'important';
      if (!result.important) result.important = [];
      result.important.push(line.replace(/^> Important:\s*/i, ''));
      continue;
    }
    
    // Collect content for current section
    if (currentSection && line) {
      currentContent.push(line);
      
      if (currentSection === 'returns') {
        result.returns = currentContent.join(' ');
      } else if (currentSection === 'throws') {
        result.throws = currentContent.join(' ');
      }
    } else if (!currentSection && line) {
      // First non-empty line is usually the summary
      if (!result.summary) {
        result.summary = line;
      } else {
        // Subsequent lines are discussion
        if (!result.discussion) {
          result.discussion = line;
        } else {
          result.discussion += ' ' + line;
        }
      }
    }
  }
  
  return result;
}

/**
 * Extracts DocC comments from Swift code
 */
export function extractDocCComments(code: string): Map<string, DocCComment> {
  const comments = new Map<string, DocCComment>();
  const lines = code.split('\n');
  
  let currentComment: string[] = [];
  let nextFunction: string | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line is a documentation comment
    if (line.trim().startsWith('///')) {
      currentComment.push(line.trim().replace(/^\/\/\//, '').trim());
    } else if (line.trim().startsWith('//')) {
      // Regular comment, skip
      continue;
    } else if (currentComment.length > 0) {
      // We have a comment, check if next line is a function/struct/class
      const trimmed = line.trim();
      if (trimmed.match(/^(func|struct|class|enum|protocol|extension|var|let)\s+/)) {
        // Extract function/type name
        const nameMatch = trimmed.match(/(?:func|struct|class|enum|protocol|extension|var|let)\s+(\w+)/);
        if (nameMatch) {
          nextFunction = nameMatch[1];
          const parsed = parseDocCComment(currentComment.join('\n'));
          if (parsed.summary || Object.keys(parsed).length > 0) {
            comments.set(nextFunction, parsed);
          }
        }
      }
      currentComment = [];
    }
  }
  
  return comments;
}

/**
 * Formats DocC comment as Markdown for display
 */
export function formatDocCComment(doc: DocCComment): string {
  let markdown = '';
  
  if (doc.summary) {
    markdown += doc.summary + '\n\n';
  }
  
  if (doc.parameters && doc.parameters.length > 0) {
    markdown += '**Parameters:**\n';
    doc.parameters.forEach(param => {
      markdown += `- \`${param.name}\`: ${param.description}\n`;
    });
    markdown += '\n';
  }
  
  if (doc.returns) {
    markdown += `**Returns:** ${doc.returns}\n\n`;
  }
  
  if (doc.throws) {
    markdown += `**Throws:** ${doc.throws}\n\n`;
  }
  
  if (doc.discussion) {
    markdown += doc.discussion + '\n\n';
  }
  
  if (doc.note && doc.note.length > 0) {
    doc.note.forEach(note => {
      markdown += `> **Note:** ${note}\n\n`;
    });
  }
  
  if (doc.warning && doc.warning.length > 0) {
    doc.warning.forEach(warning => {
      markdown += `> **Warning:** ${warning}\n\n`;
    });
  }
  
  if (doc.important && doc.important.length > 0) {
    doc.important.forEach(important => {
      markdown += `> **Important:** ${important}\n\n`;
    });
  }
  
  return markdown.trim();
}

