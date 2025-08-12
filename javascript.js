buttons = document.querySelectorAll("#buttons button")
console.log(buttons)
buttons.forEach(button => {
    button.addEventListener("mouseover",() => button.classList.add("active"))
    button.addEventListener("mouseout",() => button.classList.remove("active"))
});