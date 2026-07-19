
console.log("Portfolio Loaded Successfully");
document.addEventListener("DOMContentLoaded", () => {
  const nameText = "I Am Trushita Sathe";
  const titleText = "A Computer Engineering Student";

  const nameElement = document.getElementById("typed-name");
  const titleElement = document.getElementById("typed-title");

  let nameIndex = 0;
  let titleIndex = 0;

  function typeName() {
    if (nameIndex < nameText.length) {
      nameElement.textContent += nameText.charAt(nameIndex);
      nameIndex++;
      setTimeout(typeName, 100); // typing speed
    } else {
      setTimeout(typeTitle, 500); // delay before next line
    }
  }

  function typeTitle() {
    if (titleIndex < titleText.length) {
      titleElement.textContent += titleText.charAt(titleIndex);
      titleIndex++;
      setTimeout(typeTitle, 80);
    }
  }

  typeName();
});
