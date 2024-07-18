/* 

    - Create a button that toggles the visibility of a paragraph.
    - Initially, the paragraph should be visible.
    - When the button is clicked, the paragraph should be hidden, and the button text should change to "Show".
    - When the button is clicked again, the paragraph should be shown, and the button text should change to "Hide".

 */

import { useState } from "react";

//1st
// const VisibilityToggle = () => {
//   const [showParagraph, setShowParagraph] = useState(true);

//   const toggleVisiblity = () => setShowParagraph(!showParagraph);
//   return (
//     <div>
//       {showParagraph && <p>Paragraph text</p>}
//       <button onClick={toggleVisiblity}>
//         {showParagraph ? "Hode" : "Show"}
//       </button>
//     </div>
//   );
// };

//2nd scalable
const VisibilityToggle = ({
  children,
  initialVisibility = true,
  hideLabel,
  showLabel,
}) => {
  const [show, setShow] = useState(initialVisibility);

  const toggleVisiblity = () => setShow(!show);
  return (
    <div>
      <button onClick={toggleVisiblity}>
        {show ? hideLabel || "Hide" : showLabel || "Show"}
      </button>
      {show && children}
    </div>
  );
};

export default VisibilityToggle;
