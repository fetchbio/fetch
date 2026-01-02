const PASSWORD = "9201837"
const loginCard = document.getElementById("login-card")
const editorCard = document.getElementById("editor-card")
const loginBtn = document.getElementById("login-btn")
const loginMsg = document.getElementById("login-msg")

const usernameInput = document.getElementById("username-input")
const bioInput = document.getElementById("bio-input")
const usernameEffectInput = document.getElementById("username-effect")
const pfpUpload = document.getElementById("pfp-upload")
const pfpPreview = document.getElementById("pfp-preview")
const bannerUpload = document.getElementById("banner-upload")
const bannerPreview = document.getElementById("banner-preview")
const backgroundInput = document.getElementById("background-input")
const linksInput = document.getElementById("links-input")
const discordUsernameInput = document.getElementById("discord-username-input")
const discordStatusInput = document.getElementById("discord-status-input")
const discordPfpInput = document.getElementById("discord-pfp-input")
const saveBtn = document.getElementById("save-btn")
const saveMsg = document.getElementById("save-msg")
const lastUpdateEl = document.getElementById("last-update")

// charts
const viewsCtx = document.getElementById("viewsChart").getContext("2d")
const clicksCtx = document.getElementById("clicksChart").getContext("2d")
let viewsChart, clicksChart

loginBtn.onclick = ()=>{
    if(document.getElementById("pass").value === PASSWORD){
        loginCard.style.display="none"
        editorCard.style.display="block"
        loadData()
        loadStats()
    }else{
        loginMsg.textContent="Wrong password"
    }
}

// Image previews
pfpUpload.onchange = e=>{
    const file = e.target.files[0]
    if(file){
        const reader = new FileReader()
        reader.onload = ()=>{pfpPreview.src = reader.result}
        reader.readAsDataURL(file)
    }
}

bannerUpload.onchange = e=>{
    const file = e.target.files[0]
    if(file){
        const reader = new FileReader()
        reader.onload = ()=>{bannerPreview.style.background=`url('${reader.result}') center/cover`}
        reader.readAsDataURL(file)
    }
}

// load profile data
function loadData(){
    const data = JSON.parse(localStorage.getItem("profile"))||{}
    usernameInput.value = data.username||""
    bioInput.value = data.bio||""
    usernameEffectInput.value = data.usernameEffect||"none"
    linksInput.value = data.links ? data.links.join("\n") : ""
    pfpPreview.src = data.pfp||""
    bannerPreview.style.background = data.banner||""
    backgroundInput.value = data.background||""
    discordUsernameInput.value = data.discordUsername||""
    discordStatusInput.value = data.discordStatus||""
    discordPfpInput.value = data.discordPfp||""
}

// stats
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

// save profile
saveBtn.onclick = ()=>{
    const data = {
        username: usernameInput.value,
        usernameEffect: usernameEffectInput.value,
        bio: bioInput.value,
        pfp: pfpPreview.src||"",
        banner: bannerPreview.style.background||"",
        background: backgroundInput.value||"",
        links: linksInput.value.split("\n").filter(l=>l.trim()!==""),
        discordUsername: discordUsernameInput.value,
        discordStatus: discordStatusInput.value,
        discordPfp: discordPfpInput.value
    }
    localStorage.setItem("profile",JSON.stringify(data))
    localStorage.setItem("lastUpdate",new Date().toLocaleString())
    saveMsg.textContent="Saved!"
    loadStats()
}
