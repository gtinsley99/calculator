import { useState } from "react";
import { create, all, evaluate} from "mathjs";
import "./App.css";

function App() {
  const config = {};
  const math = create(all, config);
  document.addEventListener("keydown", (e) => {
    let pressed = `${e.key}`;
    switch (pressed) {
      case "c":
      case "C":
        setSum("");
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case "+":
      case "e":
      case "/":
      case "*":
      case "-":
        setSum(sum + pressed);
        break;
      default:
        return;
    }
  });

  const [sum, setSum] = useState("");
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

  

  const handleClick = (button) => {
    switch (button) {
      case "=": 
        setSum(math.format(evaluate(sum), {precision: (14)}));
        break;
      case "C":
      case "c":
        setSum("");
        break;
      case "del":
        let newStr = sum;
        newStr = newStr.substring(0, newStr.length - 1);
        setSum(newStr);
        break;
      case "√":
        setSum(sum + "sqrt(");
        break;
      // case "ANS":
      //   setSum(sum + prevAns);
      //   break;
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
    <div className="App">
      <div className="calculator">
        <div className="outputBox">
          <div className="output">
            <h2>{sum}</h2>
          </div>
          <div className="output">
            <h2>(answer)</h2>
          </div>
        </div>
        <div className="buttonLayout">{signs}</div>
      </div>
    </div>
  );
}

export default App;
