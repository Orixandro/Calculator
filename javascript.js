const operationList = {
    addition: function() {
        return num.value[0] + num.value[1]
    },
    subtraction: function() {
        return num.value[0] - num.value[1]
    },
    multiplication: function() {
        return num.value[0] * num.value[1]
    },
    division: function() {
        return num.value[0] / num.value[1]
    },
    operatorList: {
        addition: "+",
        subtraction: "-",
        multiplication: "x",
        division: "/",
    }
}

const history = document.querySelector("#history")

const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    button.addEventListener("mouseover",() => button.classList.add("active"))
    button.addEventListener("mouseout",() => button.classList.remove("active"))
});

let num = {
    value: [0, 0],
    current: 0,
    text: "0",
    display: "",
}

let operator = ""

let operation = ""

const numDisplay = document.querySelector("#numDisplay")
const operationDisplay = document.querySelector("#operationDisplay")

function refreshOperation() {
    switch (num.current) {
        case 0:
            operation = num.value[0].toString()
            break
        case 1:
            operation = num.value[0].toString() + " " + operationList.operatorList[operator] + " " + num.value[1].toString()
            break
    }
}

function refreshDisplays() {
    numDisplay.textContent = num.display
    operationDisplay.textContent = operation
}

const numberButtons = document.querySelectorAll("#buttons .number")
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => {
        number = numberButton.getAttribute("id")

        num.text += number
        num.value[num.current] = +num.text
        num.display = num.value[num.current].toString()

        refreshOperation()
        refreshDisplays()
    })
})

const operationButtons = document.querySelectorAll("#buttons .operation")
operationButtons.forEach((operationButton) => {
    operationButton.addEventListener("click", () => {
        if (num.current === 1) {
            let result = operationList[operator]()

            let finishedOperation = document.createElement("li")

            let operationDiv = document.createElement("div")

            let copyButton = document.createElement("button")
            let removeButton = document.createElement("button")    
            
            copyButton.classList.add("copy")
            removeButton.classList.add("remove")
            copyButton.textContent = "Copy result"
            removeButton.textContent = "Remove"
            copyButton.addEventListener("mouseover",() => copyButton.classList.add("active"))
            copyButton.addEventListener("mouseout",() => copyButton.classList.remove("active"))
            removeButton.addEventListener("mouseover",() => removeButton.classList.add("active"))
            removeButton.addEventListener("mouseout",() => removeButton.classList.remove("active"))
            
            copyButton.addEventListener("click", () => {
                navigator.clipboard.writeText(result)
                copyButton.textContent = "Result copied!"
                setTimeout(() => {
                    copyButton.textContent = "Copy result"
                }, 1500)
            })
            removeButton.addEventListener("click", () => finishedOperation.remove())

            operationDiv.textContent = operation + " = " + result

            operationDiv.appendChild(copyButton)
            operationDiv.appendChild(removeButton)

            finishedOperation.appendChild(operationDiv)

            history.insertBefore(finishedOperation, history.children[0])

            num.value[0] = result
            num.value[1] = 0
            num.display = result.toString()
        }

        num.current = 1
        num.text = "0"
        operator = operationButton.getAttribute("id")
        
        if (operator === "equality") {
            num.current = 0
        }

        refreshOperation()
        refreshDisplays()
    })
})

const ACButton = document.querySelector("#AC")
ACButton.addEventListener("click", () => {
    num = {
        value: [0, 0],
        current: 0,
        text: "0",
        display: "",
    }

    operator = ""

    operation = ""

    refreshDisplays()
})

const deleteButton = document.querySelector("#delete")
deleteButton.addEventListener("click", () => {
    num.text = num.text.slice(0, -1)
    num.value[num.current] = +num.text
    num.display = num.value[num.current].toString()

    refreshOperation()
    refreshDisplays()
})

const decimalButton = document.querySelector("#decimal")
decimalButton.addEventListener("click", () => {
    if (!(num.text.includes("."))) {
        num.text += "."
    }
})

const signButton = document.querySelector("#sign")
signButton.addEventListener("click", () => {
    if (num.text.slice(0, 1) === "-") {
        num.text = num.text.slice(1)
    } else {
        num.text = "-" + num.text
    }
    
    num.value[num.current] = +num.text
    num.display = num.value[num.current].toString()

    refreshOperation()
    refreshDisplays()
})

const removeAllButton = document.querySelector("#removeAll")
removeAllButton.addEventListener("mouseover",() => removeAllButton.classList.add("active"))
removeAllButton.addEventListener("mouseout",() => removeAllButton.classList.remove("active"))
removeAllButton.addEventListener("click", () => history.replaceChildren())