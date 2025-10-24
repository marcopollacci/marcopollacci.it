/**
 * Check if the current date is between the 1st of January and the 6th of January,
 * or between the 15th of November and the 31st of December.
 * This is used to determine if it is currently Christmas time and if the Christmas
 * theme should be applied to the website.
 *
 * @returns {boolean} - true if it is Christmas time, false otherwise
 */
const isFestiveSeason = (startDate, endDate, isChristmas = true) => {
  const [monthStart, dayStart] = startDate;
  const [monthEnd, dayEnd] = endDate;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startOfSeason = new Date(currentYear, monthStart, dayStart);
  console.log("🚀 ~ isFestiveSeason ~ startOfSeason:", startOfSeason);
  const endOfSeason = new Date(currentYear, monthEnd, dayEnd);
  console.log("🚀 ~ isFestiveSeason ~ endOfSeason:", endOfSeason);

  return (
    (isChristmas &&
      currentDate.getMonth() === 0 &&
      currentDate.getDate() <= 6) ||
    (currentDate >= startOfSeason && currentDate <= endOfSeason)
  );
};

/**
 * Check if it is Christmas time and if so, loads snowflake components
 * and changes the img of the main page.
 *
 * @returns {void}
 */
const isChristmasTime = () => {
  if (isFestiveSeason([10, 15], [11, 31])) {
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
};

/** Check if it is Spooky season (15th October to 2nd November)
 * and if so, changes the img of the main page.
 *
 * @returns {void}
 */
const isSpookySeason = () => {
  if (isFestiveSeason([9, 15], [10, 2], false)) {
    document.body.setAttribute("is-spooky-time", "");
    //change img
    const img = document.querySelector("img");
    img.src = "images/me-spooky.webp";
  }
};

/**
 * Toggle the class of the body based on the preferred color scheme.
 * @param {String} preference - The preferred color scheme
 * @returns {void}
 */
const toggleClass = (preference) => {
  if (preference === "system") {
    localStorage.removeItem("marco-pollacci-preferredTheme");
    document.body.classList.remove(
      "is-forced-light-mode",
      "is-forced-dark-mode"
    );
    return;
  }
  document.body.classList.toggle(
    "is-forced-light-mode",
    preference === "light"
  );
  document.body.classList.toggle("is-forced-dark-mode", preference === "dark");
  localStorage.setItem("marco-pollacci-preferredTheme", preference);
};

/**
 * On page load, check if there is a preferred theme saved in local storage,
 * if so apply it. Also add an event listener to the light-dark-toggle element
 * so that when it is clicked, it toggles the class of the body to the preferred
 * color scheme.
 */
const startUp = () => {
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
};

startUp();
isChristmasTime();
isSpookySeason();

console.log(`
    __
___( o)>
\\ <_. )
  \`---' 

Quack! 🦆
Welcome to my code! 🚀
If you're interested, check out my GitHub:
https://github.com/marcopollacci`);
