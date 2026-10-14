
let body = document.body;
let bnt = document.getElementById("bnt");


if (localStorage.getItem("mode") === "dark") {
body.classList.add("dark");
bnt.innerHTML = '<i class="bi bi-sun"></i>';
}


bnt.addEventListener("click", () => {
body.classList.toggle("dark");

if (body.classList.contains("dark")) {
localStorage.setItem("mode", "dark");
bnt.innerHTML = '<i class="bi bi-sun"></i>';
} else {
localStorage.setItem("mode", "light");
bnt.innerHTML = '<i class="bi bi-moon"></i>';
}
});


const langBtn = document.getElementById("langBtn");

langBtn.addEventListener("click", () => {
if (document.documentElement.lang === "en") {
document.documentElement.lang = "ar";
document.body.style.direction = "rtl";
langBtn.textContent = "EN";
} else {
document.documentElement.lang = "en";
document.body.style.direction = "ltr";
langBtn.textContent = "AR";
}
});