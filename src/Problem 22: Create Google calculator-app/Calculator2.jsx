import React, { useState } from "react";
import { create, all } from "mathjs";
import "./styles.css";

// Configure mathjs
const math = create(all);

const Calculator2 = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      // Evaluate the expression using mathjs
      const evalResult = math.evaluate(expression);
      setResult(evalResult);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value.match(/[a-z]/i)) {
      setExpression(value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <input
          className="expression"
          onChange={handleChange}
          value={expression}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEqual();
            }
          }}
        />

        <div className="result">Ans : {result}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear}>AC</button>
        <button onClick={() => handleButtonClick("%")}>%</button>
        <button onClick={handleBackspace}>⌫</button>
        <button onClick={() => handleButtonClick("/")}>÷</button>
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick("*")}>×</button>
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("+")}>+</button>
        <button onClick={() => handleButtonClick("00")}>00</button>
        <button onClick={() => handleButtonClick("0")}>0</button>
        <button onClick={() => handleButtonClick(".")}>.</button>
        <button onClick={handleEqual}>=</button>
      </div>
    </div>
  );
};

export default Calculator2;
