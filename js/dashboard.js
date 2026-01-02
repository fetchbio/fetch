const PASSWORD = "9201837"

const loginCard = document.getElementById("login-card")
const editorCard = document.getElementById("editor-card")
const loginBtn = document.getElementById("login-btn")
const loginMsg = document.getElementById("login-msg")

const usernameInput = document.getElementById("username-input")
const bioInput = document.getElementById("bio-input")
const pfpInput = document.getElementById("pfp-input")
const bannerInput = document.getElementById("banner-input")
const linksInput = document.getElementById("links-input")
const saveBtn = document.getElementById("save-btn")
const saveMsg = document.getElementById("save-msg")

const viewsEl = document.getElementById("views")
const clicksEl = document.getElementById("clicks")
const lastUpdateEl = document.getElementById("last-update")

loginBtn.onclick=()=>{
  if(document.getElementById("pass").value===PASSWORD){
    loginCard.style.display="none"
    editorCard.style.display="block"
    loadData()
    loadStats()
  }else{
    loginMsg.textContent="Wrong password"
  }
}

function loadData(){
  const data = JSON.parse(localStorage.getItem("profile"))||{}
  usernameInput.value=data.username||""
  bioInput.value=data.bio||""
  pfpInput.value=data.pfp||""
  bannerInput.value=data.banner||""
  linksInput.value=data.links?data.links.join("\n"):""
}

function loadStats(){
  const stats = JSON.parse(localStorage.getItem("stats"))||{views:0,clicks:0}
  viewsEl.textContent=stats.views||0
  clicksEl.textContent=stats.clicks||0
  lastUpdateEl.textContent = localStorage.getItem("lastUpdate")||"Never"
}

saveBtn.onclick=()=>{
  const data={
    username:usernameInput.value,
    bio:bioInput.value,
    pfp:pfpInput.value,
    banner:bannerInput.value,
    links:linksInput.value.split("\n").filter(l=>l.trim()!=="")
  }
  localStorage.setItem("profile",JSON.stringify(data))
  localStorage.setItem("lastUpdate",new Date().toLocaleString())
  saveMsg.textContent="Saved!"
  loadStats()
}
