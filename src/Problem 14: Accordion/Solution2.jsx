// - Create an accordion component with multiple sections.
// - Each section should have a title and content.
// - Clicking a section title should expand/collapse the section to show/hide the content.
// - Only one section should be expanded at a time.

import React, { useState } from "react";

const defaultSections = [
  {
    id: 1,
    title: "Introduction",
    content:
      "This is the introduction section. It provides an overview of the topic.",
  },
  {
    id: 2,
    title: "Background",
    content: "This section provides background information and context.",
  },
  {
    id: 3,
    title: "Main Content",
    content:
      "Here is the main content of the topic, covering all the essential details.",
  },
  {
    id: 4,
    title: "Analysis",
    content:
      "This section contains an analysis of the main content, offering insights and perspectives.",
  },
  {
    id: 5,
    title: "Conclusion",
    content:
      "The conclusion summarizes the key points and provides final thoughts.",
  },
];

const expandIcon = <>&#x25B6;</>;
const collapseIcon = <>&#x25BC;</>;

const Accordion2 = ({ sections = defaultSections }) => {
  const [expandedSectionId, setExpandedSectionId] = useState(sections[0].id);

  return (
    <div>
      {sections.map(({ id, title, content }) => {
        const isExpanded = id === expandedSectionId;
        return (
          <div key={id}>
            <h2
              onClick={() => setExpandedSectionId(id)}
              style={{ cursor: "pointer" }}
            >
              {title}{" "}
              {isExpanded ? (
                <span> {collapseIcon} </span>
              ) : (
                <span>{expandIcon}</span>
              )}
            </h2>
            {isExpanded && <p>{content}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion2;
