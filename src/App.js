import { useState } from "react";
import { create, all, evaluate } from "mathjs";
import "./App.css";

function App() {
  const config = {};

  const math = create(all, config);

  const [sum, setSum] = useState("");

  const [answer, setAnswer] = useState("");

  const [prevAns, setPrevAns] = useState("");


  const buttons = [
    "ANS",
    "^",
    "e",
    "√",
    "(",
    ")",
    "del",
    "7",
    "8",
    "9",
    "C",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "/",
    "0",
    "+",
    ".",
    "-",
    "=",
  ];

  // Change answer as long as no error
  const tryNewAns = (button) => {
    let newSum = "";
    setSum(sum + button);
    try {
      newSum = math.format(evaluate(sum + button), { precision: 14 });
      setAnswer(newSum);
    } catch (e) {
      if (e instanceof SyntaxError) {
        return;
      } else {
        throw e;
      }
    }
  };

  // Delete last index from string
  const removeLastString = () => {
    let newStr = sum;
    newStr = newStr.substring(0, newStr.length - 1);
    setSum(newStr);
  };

  // Evaluate sum
  const evalSum = () => {
    setSum(math.format(evaluate(sum), { precision: 14 }));
    let oldAns = math.format(evaluate(sum), { precision: 14 });
    setPrevAns(oldAns);
  };

  // keypress adds to sum
  const handleKeyPress = (e) => {
    e.preventDefault();
    let button = `${e.key}`;
    switch (button) {
      case "c":
      case "C":
        setSum("");
        setAnswer("");
        break;
      case "=":
      case "Enter":
        evalSum();
        break;
      case "Backspace":
      case "Delete":
        removeLastString();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ")":
        tryNewAns(button);
        break;
      case "+":
      case "e":
      case "/":
      case "*":
      case "-":
      case ".":
      case "^":
      case "(":
        setSum(sum + button);
        break;
      default:
        return;
    }
  };

  // buttons add to sum on press
  const handleClick = (button) => {
    switch (button) {
      case "=":
        evalSum();
        break;
      case "C":
      case "c":
        setSum("");
        setAnswer("");
        break;
      case "del":
        removeLastString();
        break;
      case "√":
        setSum(sum + "sqrt(");
        break;
      case "ANS":
        setSum(sum + prevAns);
        tryNewAns(prevAns);
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "e":
      case ")":
        tryNewAns(button);
        break;
      default:
        setSum(sum + button);
    }
  };

  const signs = buttons.map((button, index) => {
    return (
      <button
        className={`button-${index}`}
        key={index}
        label={button}
        onClick={() => handleClick(button)}
      >
        {button}
      </button>
    );
  });

  return (
    <div className="App" onKeyDown={handleKeyPress}>
      <div className="border">
        <div className="calculator">
          <div className="outputBox">
            <div className="output">
              <h2>{sum}</h2>
            </div>
            <div className="output">
              <h2>{answer}</h2>
            </div>
          </div>
          <div className="buttonLayout">
            {signs}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
