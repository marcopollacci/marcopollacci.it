const style = fetch(
  !document.URL.includes(":5050")
    ? document.currentScript.getAttribute("cssUrl")
    : "./css/spooky.css"
).then((response) => response.text());
const MAX_PUMPKINS = 1500;
class SpookyPumpkin extends HTMLElement {
  static observedAttributes = ["pumpkins"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
    style.then((css) => {
      const stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(css);
      this.shadowRoot.adoptedStyleSheets.push(stylesheet);
    });
  }

  connectedCallback() {
    if (!this.pumpkin) {
      this.#letItPumpkin();
    }
  }

  disconnectedCallback() {
    this.shadowRoot.innerHTML = "";
  }

  get pumpkins() {
    return this.getAttribute("pumpkins");
  }

  set pumpkins(value) {
    if (value === this.pumpkins) return;
    this.setAttribute("pumpkins", value);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "pumpkins") {
      this.shadowRoot.innerHTML = "";
      const isExcideedMaxPumpkins = newValue >= MAX_PUMPKINS;
      if (isExcideedMaxPumpkins)
        console.error(
          `The maximum number of pumpkins is ${MAX_PUMPKINS}, the current value is ${newValue}`
        );
      this.#letItPumpkin(isExcideedMaxPumpkins ? MAX_PUMPKINS : newValue);
    }
  }

  /**
   * The function `letItPumpkin` appends a specified number of pumpkins to a designated element in the
   * shadow DOM.
   * @param [numberOfPumpkins=100] - The `numberOfPumpkins` parameter in the `letItPumpkin` function
   * specifies the number of pumpkins to be generated and appended to the `.spooky-pumpkin-area` element in the
   * component's shadow DOM. By default, if no value is provided when calling the function, it will
   * generate 100
   */
  #letItPumpkin(numberOfPumpkins = 100) {
    for (let i = 0; i < numberOfPumpkins; i++) {
      this.shadowRoot.appendChild(pumpkinMaker().next().value);
    }
  }
}

/**
 * A generator function that creates a pumpkin element.
 * The element is assigned a random class (c1, c2, c3) for styling.
 * The element is assigned a random left position, width, and height.
 * The element is assigned a random animation delay.
 * The generator yields the pumpkin element.
 */
function* pumpkinMaker() {
  //* this peace of code inside the function is taken from: https://github.com/danielglejzner/angular-christmas-calendar
  //* and modified to work with this project
  const pumpkin = document.createElement("span");
  const size = randomize(0.15, 0.85);
  const leftPos = randomize(0, 100);

  pumpkin.classList.add("pumpkin");
  pumpkin.classList.add(`c${randomize(1, 3, true)}`);
  pumpkin.style.insetInlineStart = `${leftPos}%`;
  pumpkin.style.width = `${size}vw`;
  pumpkin.style.height = `${size}vw`;
  pumpkin.style.animationDelay = `${randomize(0, 60)}s`;
  yield pumpkin;
}

/**
 * The function "randomize" generates a random number within a specified range, with an option to round
 * the result.
 * @param min - The `min` parameter in the `randomize` function represents the minimum value of the
 * range from which a random number will be generated.
 * @param max - The `max` parameter in the `randomize` function represents the maximum value that you
 * want the random number to be generated within.
 * @param [round=false] - The `round` parameter in the `randomize` function is a boolean value that
 * determines whether the random number generated should be rounded to the nearest integer or not. If
 * `round` is set to `true`, the random number will be rounded using `Math.round()`, otherwise, the
 * random number
 * @returns a random number between the specified minimum and maximum values. If the `round` parameter
 * is set to `true`, the returned value is rounded to the nearest integer.
 */
//* this function is taken from: https://github.com/danielglejzner/angular-christmas-calendar
function randomize(min, max, round = false) {
  const randomPick = Math.random() * (max - min) + min;
  return round ? Math.round(randomPick) : randomPick;
}

customElements.define("spooky-pumpkin", SpookyPumpkin);
