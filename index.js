async function fetchData() {
  const res = await fetch("https://8kz9z.wiremockapi.cloud/data");
  const data = await res.json();
  return data;
}

let GLOBALDATA;
let counter = -1;

const totalQus = document.getElementById("total_qus");
const rightQus = document.getElementById("right");
const wrongQus = document.getElementById("wrong");
const statement = document.getElementById("statement");
const optionBtn = document.querySelector("#options").children;
const trueBtn = document.getElementById("true");
const falseBtn = document.getElementById("false");
const startBtn = document.getElementById("next");
let right = 0;
let wrong = 0;

const enable = (button) => button.removeAttribute("disabled");
const disable = (button) => button.setAttribute("disabled", "true");

function startGame(curr, length, statementText) {
  rightQus.textContent = right;
  wrongQus.textContent = wrong;
  statement.textContent = statementText;
  totalQus.textContent = `${curr}/${length}`;
  for (let button of optionBtn) {
    enable(button);
    button.classList.remove("correct");
    button.classList.remove("incorrect");
  }
  startBtn.textContent = "Next Qus";
  //   startBtn.style.display = "none";
  disable(startBtn);
}

startBtn.addEventListener("click", fetchDataAndUpdate);

async function fetchDataAndUpdate() {
  counter++;
  let bool = true
  try {
    const newData = await fetchData();
    GLOBALDATA = newData[counter];
    startGame(counter + 1, newData.length, GLOBALDATA.question);
    // isCorrect(GLOBALDATA.answer);
    for (let button of optionBtn) {
      button.addEventListener("click", (e) => {
        for (let disabledButton of optionBtn) {
          disable(disabledButton);
        }

        if (e.target.value === GLOBALDATA.answer.toLowerCase()) {
            if(bool){
                right++;
                bool = false
            }
          button.classList.add("correct");
        } else {
            if(bool){
                wrong++;
                bool = false
            }
          button.classList.add("incorrect");
        }
        //   startBtn.style.display = "flex";
        enable(startBtn);
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}
