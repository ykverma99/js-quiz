async function fetchData() {
  const res = await fetch("https://8kz9z.wiremockapi.cloud/data");
  const data = await res.json();
  return data;
}

// const data = await fetchData()
// console.log(data)
let GLOBALDATA;
let counter = -1

const totalQus = document.getElementById("total_qus")
const rightQus = document.getElementById("right") 
const wrongQus = document.getElementById("wrong") 
const statement = document.getElementById("statement")
const optionBtn = document.querySelector("#options").children
const startBtn = document.getElementById("next")
let right = 0
let wrong = 0

function startGame(curr,length,statementText){
    wrongQus.textContent = wrong
    rightQus.textContent = right
    statement.textContent = statementText
    totalQus.textContent = `${curr}/${length}`
    for(let button of optionBtn){
        button.removeAttribute("disabled")
        button.classList.remove("correct")
        button.classList.remove("incorrect")
    }
    startBtn.textContent = "Next Qus"
}

function isCorrect(guess){
    for(let button of optionBtn){
        button.addEventListener('click',()=>{
            
            for(let disabledButton of optionBtn){
                disabledButton.setAttribute("disabled","true")
            }

            if(button.value === guess.toLowerCase()){
                right++
                button.classList.add("correct")
            }else{
                wrong++
                button.classList.add("incorrect")
            }
        })
    }
}

startBtn.addEventListener("click",fetchDataAndUpdate)

async function fetchDataAndUpdate(){
    counter++
    try {
        const newData = await fetchData()
        GLOBALDATA = newData[counter]
        startGame(counter+1,newData.length,GLOBALDATA.question)
        isCorrect(GLOBALDATA.answer)
        console.log("inside",GLOBALDATA)
    } catch (error) {
        console.log("error", error)
    }
}