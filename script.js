/* PAGE LOAD */
window.onload=()=>{
 document.body.style.opacity=1;
 setTimeout(()=>document.getElementById("loader").style.display="none",800);
}

/* DARK MODE */
function toggleMode(){
 document.body.classList.toggle("dark");
 localStorage.setItem("mode",
  document.body.classList.contains("dark") ? "dark" : "light"
 );
}
if(localStorage.getItem("mode")==="dark"){
 document.body.classList.add("dark");
}

/* TYPE EFFECT */
const text=["Front-End Learner","C Programmer","Future Developer"];
let i=0,j=0;
setInterval(()=>{
 document.getElementById("typing").innerText=text[i].slice(0,j++)
 if(j>text[i].length){i=(i+1)%text.length;j=0}
},130);

/* SCROLL ANIMATION */
const sections=document.querySelectorAll(".section");
function show(){
 sections.forEach(s=>{
  if(s.getBoundingClientRect().top < innerHeight-120)
    s.classList.add("show");
 });
}
addEventListener("scroll",show);
show();

/* POPUP */
function openPopup(src){
 document.getElementById("popupImg").src=src;
 document.getElementById("popup").style.display="flex";
}
function closePopup(){
 document.getElementById("popup").style.display="none";
}

/* NAVBAR ACTIVE */
const navLinks=document.querySelectorAll("#navLinks a");
window.addEventListener("scroll",()=>{
 let current="";
 document.querySelectorAll("section").forEach(sec=>{
  if(pageYOffset>=sec.offsetTop-120)
    current=sec.getAttribute("id");
 });
 navLinks.forEach(a=>{
  a.classList.remove("active");
  if(a.getAttribute("href")==="#"+current)
    a.classList.add("active");
 });
});

/* REVIEWS */
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function renderReviews(){
  const box = document.getElementById("reviewList");
  box.innerHTML = "";

  reviews.forEach((r,i)=>{
    box.innerHTML += `
      <div class="review">
        <button class="del" onclick="deleteReview(${i})">x</button>
        <strong>${r.name}</strong> <small>${r.time}</small>
        <p>${r.text}</p>
      </div>`;
  });
}
function addReview(e){
  e.preventDefault();
  reviews.push({
    name:revName.value,
    text:revText.value,
    time:new Date().toLocaleString()
  });
  localStorage.setItem("reviews",JSON.stringify(reviews));
  revName.value=""; revText.value="";
  renderReviews();
}
function deleteReview(i){
  reviews.splice(i,1);
  localStorage.setItem("reviews",JSON.stringify(reviews));
  renderReviews();
}
renderReviews();

/* PARTICLES */
const canvas=document.createElement("canvas");
const ctx=canvas.getContext("2d");
document.getElementById("particles").appendChild(canvas);

canvas.width=innerWidth;
canvas.height=innerHeight;

let dots=[];
for(let i=0;i<70;i++){
 dots.push({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*3+1,
  dx:(Math.random()-.5)*1.5,
  dy:(Math.random()-.5)*1.5
 });
}

function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);

 const color = document.body.classList.contains("dark")
  ? "rgba(167,139,250,.9)"
  : "rgba(88,28,135,.7)";

 dots.forEach(d=>{
  ctx.beginPath();
  ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
  ctx.fillStyle=color;
  ctx.fill();

  d.x+=d.dx;
  d.y+=d.dy;

  if(d.x<0||d.x>canvas.width) d.dx*=-1;
  if(d.y<0||d.y>canvas.height) d.dy*=-1;
 });

 requestAnimationFrame(animate);
}
animate();

addEventListener("resize",()=>{
 canvas.width=innerWidth;
 canvas.height=innerHeight;
});
