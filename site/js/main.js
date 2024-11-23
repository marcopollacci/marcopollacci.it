function isChristmasTime() {
  if (isFestiveSeason()) {
    document.body.classList.add("is-december");
    //load snowflakes components
    const snowflakes = document.createElement("snow-flakes");
    snowflakes.setAttribute("flakes", "300");
    document.body.appendChild(snowflakes);
    //add scripts
    const script = document.createElement("script");
    script.src =
      "https://marcopollacci.github.io/christmas-tree/components/snowflake.js";
    script.defer = true;
    document.body.appendChild(script);

    //change img
    const img = document.querySelector("img");
    img.src = "images/me-christmas.webp";
  }
}

/**
 * @function isFestiveSeason
 * @description Checks if the current date is inside the festive season
 * @returns {boolean} true if the current date is inside the festive season, false otherwise
 * @example
 * isFestiveSeason() // => true if the current date is between 15th November and 6th January
 */
function isFestiveSeason() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startOfSeason = new Date(currentYear, 10, 15); // 15 november
  const endOfSeason = new Date(currentYear + 1, 0, 6); // 6 january next year

  // if it's the first week of january
  if (currentDate.getMonth() === 0 && currentDate.getDate() <= 6) {
    return true;
  }

  // general check
  return currentDate >= startOfSeason && currentDate <= endOfSeason;
}

isChristmasTime();
