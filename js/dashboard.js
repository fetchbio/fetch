const PASSWORD = "9201837"
const loginCard = document.getElementById("login-card")
const editorCard = document.getElementById("editor-card")
const loginBtn = document.getElementById("login-btn")
const loginMsg = document.getElementById("login-msg")

const usernameInput = document.getElementById("username-input")
const bioInput = document.getElementById("bio-input")
const pfpUpload = document.getElementById("pfp-upload")
const pfpPreview = document.getElementById("pfp-preview")
const bannerUpload = document.getElementById("banner-upload")
const bannerPreview = document.getElementById("banner-preview")
const linksInput = document.getElementById("links-input")
const saveBtn = document.getElementById("save-btn")
const saveMsg = document.getElementById("save-msg")
const lastUpdateEl = document.getElementById("last-update")

// charts
const viewsCtx = document.getElementById("viewsChart").getContext("2d")
const clicksCtx = document.getElementById("clicksChart").getContext("2d")

let viewsChart, clicksChart

loginBtn.onclick = () => {
    if(document.getElementById("pass").value === PASSWORD){
        loginCard.style.display="none"
        editorCard.style.display="block"
        loadData()
        loadStats()
    }else{
        loginMsg.textContent="Wrong password"
    }
}

// IMAGE PREVIEWS
pfpUpload.onchange = e => {
    const file = e.target.files[0]
    if(file){
        const reader = new FileReader()
        reader.onload = ()=>{pfpPreview.src = reader.result}
        reader.readAsDataURL(file)
    }
}

bannerUpload.onchange = e => {
    const file = e.target.files[0]
    if(file){
        const reader = new FileReader()
        reader.onload = ()=>{bannerPreview.style.background = `url('${reader.result}') center/cover`}
        reader.readAsDataURL(file)
    }
}

// LOAD DATA
function loadData(){
    const data = JSON.parse(localStorage.getItem("profile"))||{}
    usernameInput.value = data.username||""
    bioInput.value = data.bio||""
    linksInput.value = data.links ? data.links.map(l=>l).join("\n") : ""
    if(data.pfp){pfpPreview.src = data.pfp}
    if(data.banner){bannerPreview.style.background = data.banner}
}

// STATS
function loadStats(){
    const stats = JSON.parse(localStorage.getItem("stats"))||{views:0, clicks:0}
    lastUpdateEl.textContent = localStorage.getItem("lastUpdate")||"Never"

    const viewsData = {labels:["Profile Views"], datasets:[{label:"Views",data:[stats.views||0],backgroundColor:"rgba(0,255,200,0.6)"}]}
    const clicksData = {labels:["Links Clicked"], datasets:[{label:"Clicks",data:[stats.clicks||0],backgroundColor:"rgba(255,100,100,0.6)"}]}

    if(viewsChart) viewsChart.destroy()
    if(clicksChart) clicksChart.destroy()

    viewsChart = new Chart(viewsCtx,{type:"bar",data:viewsData,options:{responsive:true,plugins:{legend:{display:false}}}})
    clicksChart = new Chart(clicksCtx,{type:"bar",data:clicksData,options:{responsive:true,plugins:{legend:{display:false}}}})
}

// SAVE DATA
saveBtn.onclick = ()=>{
    const data = {
        username: usernameInput.value,
        bio: bioInput.value,
        links: linksInput.value.split("\n").filter(l=>l.trim()!==""),
        pfp: pfpPreview.src || "",
        banner: bannerPreview.style.background || ""
    }
    localStorage.setItem("profile",JSON.stringify(data))
    localStorage.setItem("lastUpdate",new Date().toLocaleString())
    saveMsg.textContent="Saved!"
    loadStats()
}
