
function setupHeader() {
  let navToggle = document.querySelector(".nav__toggle");
  let navWrapper = document.querySelector(".nav__wrapper");

  console.log(navToggle, navWrapper);

  navToggle.addEventListener("click", function () {
      console.log("Button clicked!");

      if (navWrapper.classList.contains("active")) {
          navWrapper.classList.remove("active");
          this.innerHTML = '<i class="fas fa-bars"></i>';
      } else {
          navWrapper.classList.add("active");
          this.innerHTML = '<i class="fas fa-times"></i>';
      }
  });
}

setupHeader();
