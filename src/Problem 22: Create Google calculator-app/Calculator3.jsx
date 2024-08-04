import React, { useState } from "react";
import "./styles.css";

const Calculator3 = () => {
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
      // Evaluate the expression safely
      const evalResult = evaluateExpression(expression);
      setResult(evalResult);
    } catch (error) {
      setResult("Error");
    }
  };

  const evaluateExpression = (expr) => {
    // Parse the expression and compute the result
    // Handle basic operators: +, -, *, /, %, (, )
    const operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
      "%": (a, b) => a % b,
    };

    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "%": 2,
    };

    const toPostfix = (infix) => {
      const output = [];
      const operatorsStack = [];
      const tokens = infix.match(/\d+(\.\d+)?|[+\-*/%()]/g);

      tokens.forEach((token) => {
        if (!isNaN(token)) {
          output.push(Number(token));
        } else if (token in operators) {
          while (
            operatorsStack.length &&
            precedence[token] <=
              precedence[operatorsStack[operatorsStack.length - 1]]
          ) {
            output.push(operatorsStack.pop());
          }
          operatorsStack.push(token);
        } else if (token === "(") {
          operatorsStack.push(token);
        } else if (token === ")") {
          while (operatorsStack[operatorsStack.length - 1] !== "(") {
            output.push(operatorsStack.pop());
          }
          operatorsStack.pop();
        }
      });

      while (operatorsStack.length) {
        output.push(operatorsStack.pop());
      }

      return output;
    };

    const evaluatePostfix = (postfix) => {
      const stack = [];

      postfix.forEach((token) => {
        if (typeof token === "number") {
          stack.push(token);
        } else {
          const b = stack.pop();
          const a = stack.pop();
          stack.push(operators[token](a, b));
        }
      });

      return stack[0];
    };

    const postfix = toPostfix(expr);
    return evaluatePostfix(postfix);
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

export default Calculator3;
