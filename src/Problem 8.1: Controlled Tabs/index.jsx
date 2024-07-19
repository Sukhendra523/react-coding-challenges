/* 
**Description:**

- Create a tab component with at least three tabs.
- Each tab should display different content when clicked.
- Maintain the active tab's state and ensure the correct content is displayed. 

// states : activeTab , tabContent

// props : { tabs  }

*/

import { useEffect, useState } from "react";

const defaultTabs = [
  {
    id: 1,
    name: "Tab 1",
    content: (
      <>
        <h1>Tab 1 </h1>
        <p>
          Tab 1 Content Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Nobis excepturi repellendus repudiandae, aliquam reiciendis
          provident voluptatibus odio accusamus officia totam esse illum soluta
          facilis at! Id minus rem eligendi inventore.
        </p>
      </>
    ),
  },
  {
    id: 2,
    name: "Tab 2",
    content: (
      <>
        <h1>Tab 2 </h1>
        <p>
          Tab 2 Content Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Nobis excepturi repellendus repudiandae, aliquam reiciendis
          provident voluptatibus odio accusamus officia totam esse illum soluta
          facilis at! Id minus rem eligendi inventore.
        </p>
      </>
    ),
  },
  {
    id: 3,
    name: "Tab 3",
    content: (
      <>
        <h1>Tab 3 </h1>
        <p>
          Tab 3 Content Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Nobis excepturi repellendus repudiandae, aliquam reiciendis
          provident voluptatibus odio accusamus officia totam esse illum soluta
          facilis at! Id minus rem eligendi inventore.
        </p>
      </>
    ),
  },
];

const Tabs = ({ tabs = defaultTabs }) => {
  const [activeTab, setActiveTab] = useState(+tabs[0].id);
  const [tabContent, setTabContent] = useState(tabs[0].content);

  useEffect(() => {
    const content = tabs.find((tab) => tab.id === activeTab).content;
    setTabContent(content);
  }, [activeTab, tabs]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {tabs.map((tab, id) => (
          <button
            key={id}
            onClick={() => setActiveTab(+tab.id)}
            style={{
              backgroundColor: `${activeTab === tab.id ? "black" : "white"}`,
              color: `${activeTab === tab.id ? "white" : "black"}`,
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div>{tabContent}</div>
    </div>
  );
};

export default Tabs;
