function isChristmasTime() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startOfSeason = new Date(currentYear, 10, 15); // 15 november
  const endOfYear = new Date(currentYear, 11, 31); // 31 december

  const isFestivalSeason =
    (currentDate.getMonth() === 0 && currentDate.getDate() <= 6) ||
    (currentDate >= startOfSeason && currentDate <= endOfYear);

  if (isFestivalSeason) {
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

isChristmasTime();
