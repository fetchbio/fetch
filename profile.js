const username = document.getElementById("username")
const bio = document.getElementById("bio")
const pfp = document.getElementById("pfp")
const banner = document.getElementById("banner")
const linksContainer = document.getElementById("links")

let data = JSON.parse(localStorage.getItem("profile"))||{}
let stats = JSON.parse(localStorage.getItem("stats"))||{views:0,clicks:0}

stats.views = (stats.views||0)+1
localStorage.setItem("stats",JSON.stringify(stats))

username.textContent = data.username||"Your Name"
bio.textContent = data.bio||"Bio goes here..."
pfp.src = data.pfp||"https://via.placeholder.com/100"
banner.style.background = data.banner||"rgba(255,255,255,0.1)"
linksContainer.innerHTML=""

if(data.links){
  data.links.forEach(l=>{
    const a=document.createElement("a")
    a.href=l
    a.className="link"
    a.target="_blank"
    a.textContent=l
    a.onclick=()=>{stats.clicks=(stats.clicks||0)+1;localStorage.setItem("stats",JSON.stringify(stats))}
    linksContainer.appendChild(a)
  })
}
