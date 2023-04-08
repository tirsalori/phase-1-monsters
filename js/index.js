document.addEventListener("DOMContentLoaded", () => {
    addForm()
    document.getElementById("form").addEventListener("submit", createMonster)
    document.getElementById("forward").addEventListener("click", nextPage)
    document.getElementById("back").addEventListener("click", previousPage)
    fetch("http://localhost:3000/monsters/?_limit=50")
        .then((response) => response.json())
        .then((data) => {
            for (let object of data) {
                addMonster(object)
            }
        })
    }
)

let pageNumber = 1
function nextPage () {
    pageNumber++
    document.getElementById("monster-container").innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then((response) => response.json())
        .then((data) => {
            for (let object of data) {
                addMonster(object)
            }        
        })
}

function previousPage () {
    --pageNumber
    document.getElementById("monster-container").innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then((response) => response.json())
        .then((data) => {
            for (let object of data) {
                addMonster(object)
            }        
        })
}

function createMonster(e) {
    e.preventDefault()
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": e.target[0]["value"],
            "age": e.target[1]["value"],
            "description": e.target[2]["value"]
        })
    })
    .then((response => response.json()))
    .then((data) => {addMonster(data)})
}

function addMonster(object) {
    const div = document.getElementById("monster-container")
    let h2 = document.createElement("h2")
    h2.innerText = object["name"]
    let p1 = document.createElement("p")
    p1.innerText = `Age: ${object["age"]}`
    let p2 = document.createElement("p")
    p2.innerText =`Bio: ${object["description"]}`
    p1.style = ""
    div.appendChild(h2)
    div.appendChild(p1)
    div.appendChild(p2)
}


function addForm() {
    const btn = document.createElement("input")
    const div = document.getElementById("create-monster")
    const form = document.createElement("form")
    const nameField = document.createElement("input")
    const ageField = document.createElement("input")
    const descField = document.createElement("input")
    btn.value = "Create Monster"
    btn.setAttribute("type","submit")
    form.setAttribute("id","form")
    nameField.setAttribute("type", "text")
    nameField.placeholder = "Enter Name"
    ageField.setAttribute("type", "number")
    ageField.placeholder = "Enter Age"
    descField.setAttribute("type", "text")
    descField.placeholder = "Enter Bio"
    div.appendChild(form)
    form.appendChild(nameField)
    form.appendChild(ageField)
    form.appendChild(descField)
    form.appendChild(btn)
}