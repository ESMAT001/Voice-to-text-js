var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var vtt = new SpeechRecognition()
console.log(vtt)
vtt.continuous = true
vtt.lang = "en-us"


document.getElementById("lang").addEventListener("click", e => {
    vtt.lang = e.target.value
})

let btn = document.getElementById("btn")
btn.addEventListener("click", run)

let resultContainer = document.getElementById("result");

let btnClear = document.getElementById("btnClear")



btnClear.onclick=()=>{
    resultContainer.innerHTML=""
}

let textRed=document.getElementById("text")
function run() {
    btn.setAttribute("end",btn.getAttribute("end")=="true"?"false":"true")
    btn.classList.toggle("btn-success")
    btn.classList.toggle("btn-danger")
    
    
     
    textRed.classList.toggle("fade")

    btn.textContent = btn.textContent == "Start" ? "Stop" : "Start"
    return btn.textContent !== "Start" ? vtt.start() : vtt.stop()
}



vtt.onresult = e => {
    let result = e.results[e.results.length - 1][0].transcript
    console.log(result)
    let html=document.createElement("p")
    html.classList.add("font-weight-light","text-center","h3","my-2")
    html.textContent=result
    resultContainer.append(html)
}



vtt.onstart = () => {
    console.log("started")
}

vtt.onspeechstart=()=>{

textRed.textContent="I think you said :"
btnClear.classList.remove("fade")
}

vtt.onspeechend=()=>{
    textRed.textContent="Go on speak , I am listening"
}

vtt.onend = () => {
    console.log("finished")
    if(btn.getAttribute("end")!=="false"){
        btn.setAttribute("end","false")
        btn.classList.toggle("btn-success")
        btn.classList.toggle("btn-danger")
    
        textRed.classList.toggle("fade")
    
        btn.textContent = btn.textContent == "Start" ? "Stop" : "Start"
    }
}
