const isFestiveSeason = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startOfSeason = new Date(currentYear, 10, 15); // 15 november
  const endOfYear = new Date(currentYear, 11, 31); // 31 december

  return (
    (currentDate.getMonth() === 0 && currentDate.getDate() <= 6) ||
    (currentDate >= startOfSeason && currentDate <= endOfYear)
  );
};

function isChristmasTime() {
  if (isFestiveSeason()) {
    document.body.setAttribute("is-christmas-time", "");
    //load snowflakes components
    const snowflakes = document.createElement("snow-flakes");
    snowflakes.setAttribute("flakes", "300");
    document.body.appendChild(snowflakes);
    //add scripts
    const script = document.createElement("script");
    script.src = "https://snowflake.marcopollacci.it/snowflake.js";
    script.setAttribute(
      "cssUrl",
      "https://snowflake.marcopollacci.it/snowflake.css"
    );
    script.defer = true;
    document.body.appendChild(script);

    //change img
    const img = document.querySelector("img");
    img.src = "images/me-christmas.webp";
  }
}

/**
 * Toggle the class of the body based on the preferred color scheme.
 * @param {String} preference - The preferred color scheme
 * @returns {void}
 */
const toggleClass = (preference) => {
  document.body.classList.toggle(
    "is-forced-light-mode",
    preference === "light"
  );
  document.body.classList.toggle("is-forced-dark-mode", preference === "dark");
  localStorage.setItem("marco-pollacci-preferredTheme", preference);
};

const preferredTheme = localStorage.getItem("marco-pollacci-preferredTheme");
if (preferredTheme && !isFestiveSeason()) {
  toggleClass(preferredTheme);
}

document
  .querySelector(".light-dark-toggle")
  .addEventListener("click", (event) => {
    const preference = event.target.getAttribute("prefer-color-scheme");
    if (!preference) {
      return;
    }
    toggleClass(preference);
  });

isChristmasTime();

console.log(`
    __
___( o)>
\\ <_. )
  \`---' 

Quack! 🦆
Welcome to my code! 🚀
If you're interested, check out my GitHub:
https://github.com/marcopollacci`);
