const btns = document.querySelectorAll(".btns");
const optOne = document.querySelector(".opt-one");
const optTwo = document.querySelector(".opt-two");
const optThree = document.querySelector(".opt-three");
const menuOne = document.querySelector(".menu-one");
const menuTwo = document.querySelector(".menu-two");
const menuThree = document.querySelector(".menu-three");
const msg = document.querySelector(".mess-sent");

// add and remove active class
function addActive(e) {
  const elems = document.querySelector(".active");
  if (elems !== null) {
    elems.classList.remove("active");
  }
  e.target.className = "active";
}

function showContent() {
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", addActive);
  }
  optOne.addEventListener("click", function() {
    menuOne.classList.remove("off");
    menuOne.classList.add("on");
    menuTwo.classList.remove("on");
    menuTwo.classList.add("off");
    menuThree.classList.remove("on");
    menuThree.classList.add("off");
  });
  optTwo.addEventListener("click", function() {
    menuOne.classList.remove("on");
    menuOne.classList.add("off");
    menuTwo.classList.remove("off");
    menuTwo.classList.add("on");
    menuThree.classList.remove("on");
    menuThree.classList.add("off");
  });
  optThree.addEventListener("click", function() {
    menuThree.classList.remove("off");
    menuThree.classList.add("on");
    menuTwo.classList.add("off");
    menuTwo.classList.remove("on");
    menuOne.classList.add("off");
    menuOne.classList.remove("on");
  });
}


showContent();

setTimeout(function(){
  msg.style.display = 'none';
},2000);