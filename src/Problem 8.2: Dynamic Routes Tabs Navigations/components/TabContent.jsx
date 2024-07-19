import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultTabs } from "../Data";

const TabContent = () => {
  const [content, setContent] = useState();
  const { tabName } = useParams();
  useEffect(() => {
    const contentData = defaultTabs.find(
      (tab) => tab.name.replace(" ", "-").toLocaleLowerCase() === tabName
    ).content;
    setContent(contentData);
  }, [tabName]);

  return content;
};

export default TabContent;
