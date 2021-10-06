import fetchCountries from "./fetchCountries";
import * as _ from "lodash";
import listTpl from "./templateList.hbs";
import cardTpl from "./templateCard.hbs";
import * as PNotify from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/BrightTheme.css";
import "./styles.css";

const inputEl = document.querySelector(".input");
const container = document.querySelector(".countries-container");
const myStack = new PNotify.Stack({
  dir1: "up",
});

inputEl.addEventListener("input", _.debounce(onInput, 500));
function onInput(e) {
  e.preventDefault();
  fetchCountries(e).then((data) => {
    container.innerHTML = "";
    myStack.close(true);
    if (data.length === 1) {
      container.insertAdjacentHTML("beforeend", cardTpl(data[0]));
    } else if (data.length < 11 && data.length > 2) {
      data.forEach((country) => {
        console.log(country.name);
      });
      container.insertAdjacentHTML("beforeend", listTpl(data));
    } else {
      PNotify.notice({
        text: "Too many matches found. Please, enter a more specific query!",
        stack: myStack,
        modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
      });
    }
  });
}
