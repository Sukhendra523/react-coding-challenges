/* 
**Description:**

- Create a tab component with at least three tabs.
- when clicked on any tab it should navigate to a different route and it's content should be displayed
- Maintain the active tab's state and ensure the correct content is displayed. 


LLD 
// router : consist all routes
// component : Layout , TabBar , TabContent

TabBar
// props : { tabs  }

TabContent:
// states : content
// params : tabName
// useEffect : fetch and set content 

*/

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TabContent from "./components/TabContent";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    errorElement: "Error sorry!",
    children: [
      {
        path: "/:tabName",
        element: <TabContent />,
      },
    ],
  },
]);

const DynamicRoutesNavigation = () => {
  return <RouterProvider router={router} />;
};

export default DynamicRoutesNavigation;
