function isChristmasTime() {
  const date = new Date();
  const isChristmasTime = date.getMonth() === 11;
  if (isChristmasTime) {
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
    img.src = "images/me-christmas.jpg";
  }
}

window.onload = () => {
  isChristmasTime();
};
