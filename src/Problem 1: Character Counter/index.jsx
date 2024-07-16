/* 
Description:

Create an input box and a paragraph tag under this input box.
As the user types in the input box, the paragraph tag should display the number of characters typed.
When the character count exceeds 10, the text color in the paragraph tag should turn red.
 */
import { useState } from "react";

const CharacterCount = ({limit=10}) => {
    const [totalCharacterCount, setTotalCharacterCount] = useState(0);
    const [error, setError] = useState(false);

    const handleChange = ( e ) =>{
        const totalTextLength = e.target.value.length; 
        setTotalCharacterCount(totalTextLength);
        setError(totalTextLength > limit);
    }

  return (
    <div>
        <input type="text" onChange={handleChange}/>
        <p className={`${error?'error':''}`}>{totalCharacterCount}</p>
    </div>
  )
}

export default CharacterCount;
