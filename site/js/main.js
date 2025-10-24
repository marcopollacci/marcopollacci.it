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
  const endOfSeason = new Date(currentYear, monthEnd, dayEnd);

  return (
    (isChristmas &&
      currentDate.getMonth() === 0 &&
      currentDate.getDate() <= 6) ||
    (currentDate >= startOfSeason && currentDate <= endOfSeason)
  );
};

/**
 * Generates and appends a script element to the document body with the specified source and CSS URL.
 * @param {string} src - The source URL of the script to be added.
 * @param {string} cssUrl - The URL of the CSS file to be associated with the script.
 */
const generateScript = (src, cssUrl) => {
  const script = document.createElement("script");
  script.src = src;
  script.setAttribute("cssUrl", cssUrl);
  script.defer = true;
  document.body.appendChild(script);
};

/** Generates a custom component tag, sets an attribute, and appends it to the document body.
 * @param {string} bodyAttribute - The attribute to be set on the body element.
 * @param {string} tagName - The name of the custom component tag to be created.
 * @param {string} attribute - The attribute to be set on the custom component.
 * @param {number} number - The value to be assigned to the specified attribute of the custom component.
 */
const generateComponenTag = (bodyAttribute, tagName, attribute, number) => {
  document.body.setAttribute(bodyAttribute, "");

  const component = document.createElement(tagName);
  component.setAttribute(attribute, number);
  document.body.appendChild(component);
};

/**
 * Check if it is Christmas time and if so, loads snowflake components
 * and changes the img of the main page.
 *
 * @returns {void}
 */
const isChristmasTime = () => {
  if (isFestiveSeason([10, 15], [11, 31])) {
    //load snowflakes components
    generateComponenTag("is-christmas-time", "snow-flakes", "flakes", "300");

    //add scripts
    generateScript(
      "https://snowflake.marcopollacci.it/snowflake.js",
      "https://snowflake.marcopollacci.it/snowflake.css"
    );

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
    generateComponenTag("is-spooky-time", "spooky-pumpkin", "pumpkins", "150");

    generateScript("./js/spooky.js", "https://marcopollacci.it/css/spooky.css");

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
