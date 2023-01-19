const burgerMenu = document.getElementById("burger-menu");

const overlay = document.querySelector(".header__nav");

burgerMenu.addEventListener("click", function (e) {
  e.preventDefault();

  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
});
