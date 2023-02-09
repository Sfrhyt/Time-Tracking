import data from "../config/data.json"

const formatId = (str: string): string => {
    return str.toString().toLowerCase().replace(" ", "-")
}

const generateTimes = (timeWeek: stirng) => {
    const times = document.querySelector(".tracking-times") as HTMLDivElement
    times.innerHTML = ""
    data.forEach(value => {
        times.innerHTML += `
            <div class="tracking-side" id=${formatId(value.title)}>
                <div class="tracking-information">
                <div class="tracking-title">
                    <h1>${value.title}</h1>
                    <img src="/src/assets/icon-ellipsis.svg"></img>
                </div>
                <div class="tracking-hours">
                    <h1>${value.timeframes[timeWeek].current}hrs</h1>
                    <p>Last Week - ${value.timeframes[timeWeek].previous}hrs</p>
                </div>
                </div>
            </div>
        `
    })
}

const setActive = (element: HTMLElement) => {
    const active = document.getElementById("active") as HTMLParagraphElement
    active.removeAttribute("id")
    element.setAttribute("id", "active")
}

document.querySelectorAll(".user-times p").forEach(e => {
    e.addEventListener("click", (e2: Event) => {
        const element = e2.target as HTMLParagraphElement
        setActive(element)
        localStorage.setItem("timeWeek", element.getAttribute("time"))
        generateTimes(element.getAttribute("time"))
    })
})

window.addEventListener("DOMContentLoaded", () => { 
    const timeWeek = localStorage.getItem("timeWeek") || "daily"
    setActive(document.querySelector(`[time=${timeWeek}]`) as HTMLParagraphElement)
    generateTimes(timeWeek)
})