// - Create an accordion component with multiple sections.
// - Each section should have a title and content.
// - Clicking a section title should expand/collapse the section to show/hide the content.

import React from "react";

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
// - Note : using details summary section will not close automaticlly.
const Accordion1 = ({ sections = defaultSections }) => {
  return (
    <div className="accordion">
      {sections.map(({ id, title, content }) => (
        <div key={id}>
          <details>
            <summary style={{ cursor: "pointer" }}>
              <h2 style={{ display: "inline-block" }}>{title}</h2>
            </summary>
            <p>{content}</p>
          </details>
        </div>
      ))}
    </div>
  );
};

export default Accordion1;
