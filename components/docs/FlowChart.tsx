import type { ReactNode } from "react";

interface FlowNode {
  id: string;
  label: string;
  type?: "start" | "process" | "decision" | "end";
  position: { x: number; y: number };
}

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export function FlowChart({
  title,
  caption,
  nodes,
  edges,
  width = 600,
  height = 400,
}: {
  title: string;
  caption?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  width?: number;
  height?: number;
}) {
  const viewBox = `0 0 ${width} ${height}`;

  // Color scheme for different node types - High contrast, readable
  const nodeStyles = {
    start: {
      fill: "#10b981", // Solid green background
      stroke: "#059669",
      textColor: "#ffffff", // White text for contrast
    },
    process: {
      fill: "#3b82f6", // Solid blue background
      stroke: "#2563eb",
      textColor: "#ffffff", // White text
    },
    decision: {
      fill: "#f59e0b", // Solid orange background
      stroke: "#d97706",
      textColor: "#ffffff", // White text
    },
    end: {
      fill: "#ef4444", // Solid red background
      stroke: "#dc2626",
      textColor: "#ffffff", // White text
    },
  };

  return (
    <section className="my-5 rounded-lg border border-border bg-surface-elevated overflow-hidden shadow-sm">
      <div className="border-b border-border bg-surface px-4 py-3">
        <div className="text-base font-semibold text-fg">{title}</div>
        {caption && (
          <div className="mt-1 text-sm leading-relaxed text-fg-muted">
            {caption}
          </div>
        )}
      </div>
      <div className="relative bg-[#1a1b2e] p-6">
        <svg
          viewBox={viewBox}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Arrow markers for different edge types */}
            <marker
              id="arrowhead-default"
              markerWidth="14"
              markerHeight="14"
              refX="12"
              refY="7"
              orient="auto"
            >
              <path d="M 0 0 L 14 7 L 0 14 z" fill="#60A5FA" stroke="#60A5FA" strokeWidth="2" />
            </marker>
            <marker
              id="arrowhead-yes"
              markerWidth="14"
              markerHeight="14"
              refX="12"
              refY="7"
              orient="auto"
            >
              <path d="M 0 0 L 14 7 L 0 14 z" fill="#10b981" stroke="#10b981" strokeWidth="2" />
            </marker>
            <marker
              id="arrowhead-no"
              markerWidth="14"
              markerHeight="14"
              refX="12"
              refY="7"
              orient="auto"
            >
              <path d="M 0 0 L 14 7 L 0 14 z" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />
            </marker>
            
            {/* Drop shadow filter */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Draw edges first (so they appear behind nodes) */}
          {edges.map((edge, idx) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const dx = toNode.position.x - fromNode.position.x;
            const dy = toNode.position.y - fromNode.position.y;
            const angle = Math.atan2(dy, dx);

            // Adjust start/end points to node edges based on node type - larger offsets
            const fromNodeRadius = fromNode.type === "decision" ? 70 : 90; // Increased
            const toNodeRadius = toNode.type === "decision" ? 70 : 90; // Increased
            
            const startX = fromNode.position.x + Math.cos(angle) * fromNodeRadius;
            const startY = fromNode.position.y + Math.sin(angle) * fromNodeRadius;
            const endX = toNode.position.x - Math.cos(angle) * toNodeRadius;
            const endY = toNode.position.y - Math.sin(angle) * toNodeRadius;

            // Determine arrow color based on label
            const labelLower = edge.label?.toLowerCase() || "";
            let arrowColor = "#60A5FA";
            let markerId = "arrowhead-default";
            if (labelLower === "yes" || labelLower === "true") {
              arrowColor = "#10b981";
              markerId = "arrowhead-yes";
            } else if (labelLower === "no" || labelLower === "false") {
              arrowColor = "#ef4444";
              markerId = "arrowhead-no";
            }

            return (
              <g key={idx}>
                <path
                  d={`M ${startX} ${startY} L ${endX} ${endY}`}
                  stroke={arrowColor}
                  strokeWidth="3" // Thicker arrows
                  fill="none"
                  markerEnd={`url(#${markerId})`}
                  opacity="1" // Full opacity
                />
                {edge.label && (
                  <g>
                    {/* Background for text - Larger, more readable */}
                    <rect
                      x={(startX + endX) / 2 - 30}
                      y={(startY + endY) / 2 - 14}
                      width="60"
                      height="24"
                      rx="6"
                      fill="rgba(26, 27, 46, 0.95)"
                      stroke={arrowColor}
                      strokeWidth="2"
                    />
                    <text
                      x={(startX + endX) / 2}
                      y={(startY + endY) / 2 - 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={arrowColor}
                      fontSize="13" // Increased from 11
                      fontFamily="var(--font-sans)"
                      fontWeight="700" // Bolder
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Draw nodes */}
          {nodes.map((node) => {
            const nodeType = node.type || "process";
            const style = nodeStyles[nodeType];
            const isDecision = node.type === "decision";
            const isStart = node.type === "start";
            const isEnd = node.type === "end";

            let shape;
            let textY = node.position.y;
            
            if (isDecision) {
              // Diamond shape for decisions - MUCH larger for readability
              const size = 70; // Increased from 50
              shape = (
                <polygon
                  points={`${node.position.x},${node.position.y - size} ${node.position.x + size},${node.position.y} ${node.position.x},${node.position.y + size} ${node.position.x - size},${node.position.y}`}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="3"
                  filter="url(#shadow)"
                />
              );
            } else if (isStart || isEnd) {
              // Rounded rectangle for start/end - MUCH larger
              const width = 180; // Increased from 130
              const height = 70; // Increased from 55
              shape = (
                <rect
                  x={node.position.x - width / 2}
                  y={node.position.y - height / 2}
                  width={width}
                  height={height}
                  rx="12"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="3"
                  filter="url(#shadow)"
                />
              );
            } else {
              // Rectangle for processes - MUCH larger
              const width = 200; // Increased from 140
              const height = 70; // Increased from 55
              shape = (
                <rect
                  x={node.position.x - width / 2}
                  y={node.position.y - height / 2}
                  width={width}
                  height={height}
                  rx="10"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="3"
                  filter="url(#shadow)"
                />
              );
            }

            // Word wrap for long labels - better algorithm
            const words = node.label.split(" ");
            const maxCharsPerLine = isDecision ? 10 : 18; // Increased for readability
            let lines: string[] = [];
            let currentLine = "";
            
            words.forEach((word) => {
              if ((currentLine + word).length <= maxCharsPerLine) {
                currentLine += (currentLine ? " " : "") + word;
              } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
              }
            });
            if (currentLine) lines.push(currentLine);

            return (
              <g key={node.id}>
                {shape}
                {/* Multi-line text - Larger, bolder, more readable */}
                {lines.map((line, idx) => {
                  const lineOffset = (idx - (lines.length - 1) / 2) * 18; // Increased spacing
                  return (
                    <text
                      key={idx}
                      x={node.position.x}
                      y={textY + lineOffset}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={style.textColor}
                      fontSize="15" // Increased from 13
                      fontFamily="var(--font-sans)"
                      fontWeight="700" // Bolder
                    >
                      {line}
                    </text>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

