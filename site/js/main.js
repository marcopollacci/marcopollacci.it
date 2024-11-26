function isChristmasTime() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startOfSeason = new Date(currentYear, 10, 15); // 15 november
  const endOfYear = new Date(currentYear, 11, 31); // 31 december

  const isFestiveSeason =
    (currentDate.getMonth() === 0 && currentDate.getDate() <= 6) ||
    (currentDate >= startOfSeason && currentDate <= endOfYear);

  if (isFestiveSeason) {
    document.body.classList.add("is-christmas-time");
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
