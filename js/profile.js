const usernameEl = document.getElementById("profile-username")
const bioEl = document.getElementById("profile-bio")
const pfpEl = document.getElementById("profile-pfp")
const bannerEl = document.getElementById("profile-banner")
const socialEl = document.getElementById("social-links")
const discordCard = document.getElementById("discord-card")
const discordUsernameEl = document.getElementById("discord-username")
const discordStatusEl = document.getElementById("discord-status")
const discordPfpEl = document.getElementById("discord-pfp")
const profileCard = document.getElementById("profile-card")
const totalViewsEl = document.getElementById("total-views")
const totalClicksEl = document.getElementById("total-clicks")

let data = JSON.parse(localStorage.getItem("profile"))||{}
let stats = JSON.parse(localStorage.getItem("stats"))||{views:0,clicks:0}

// increment profile views
stats.views = (stats.views||0)+1
localStorage.setItem("stats",JSON.stringify(stats))

// update profile info
usernameEl.textContent = data.username||"Your Name"
bioEl.textContent = data.bio||"Bio goes here..."
pfpEl.src = data.pfp||"https://via.placeholder.com/100"
bannerEl.style.background = data.banner||"rgba(255,255,255,0.1)"
profileCard.style.background = data.background||"rgba(0,0,0,0.5)"

// username effect
usernameEl.className = ""
if(data.usernameEffect){
    usernameEl.classList.add(data.usernameEffect)
}

// social links
socialEl.innerHTML = ""
if(data.links){
    data.links.forEach(l=>{
        const [platform,url] = l.split("|")
        const a = document.createElement("a")
        a.href = url
        a.target="_blank"
        a.className = "social-link "+platform.toLowerCase()
        a.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${platform.toLowerCase()}.svg" width="20"> ${platform}`
        a.onclick=()=>{stats.clicks=(stats.clicks||0)+1;localStorage.setItem("stats",JSON.stringify(stats))}
        socialEl.appendChild(a)
    })
}

// Discord card
discordUsernameEl.textContent = data.discordUsername||"Discord Username"
discordStatusEl.textContent = data.discordStatus||"Status"
discordPfpEl.src = data.discordPfp||"https://via.placeholder.com/50"

// update stats
totalViewsEl.textContent = stats.views||0
totalClicksEl.textContent = stats.clicks||0
