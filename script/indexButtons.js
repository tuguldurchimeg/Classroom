const bairbtn = document.getElementById("bair-button");
const bairlist = document.getElementById("bair-list");


bairbtn.addEventListener("click", ()=>{
   if(bairlist.classList.contains("open"))
      bairlist.classList.remove("open");
   else 
      bairlist.classList.add("open");
})