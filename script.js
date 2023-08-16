"use strict";

import { getRandom } from "./function.js";

import { colors } from "./colors.js";

// Dom Elements
const quoteContainer = document.getElementById("quote__container");
const quoteEl = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("generate");
const title = document.getElementById("title");
const titleBg = document.getElementById("title__bg");

// Initial
let quotes = [];
let randomQuote = 0;
let randomColor = 0;
let prevRandomColor = -1;
let prevRandomQuote = -1;

const getData = async () => {
  const response = await fetch("https://type.fit/api/quotes");
  const data = await response.json();
  quotes = data;

  while (randomColor === prevRandomColor) {
    randomColor = getRandom(0, colors.length);
  }

  while (randomQuote === prevRandomQuote) {
    randomQuote = getRandom(0, quotes.length);
  }

  prevRandomColor = randomColor;
  prevRandomQuote = randomQuote;

  changeQuote(quotes[randomQuote]);
  changeColor(colors[randomColor]);
};

getData();

const changeQuote = (quote) => {
  quoteEl.textContent = quote.text;
  author.textContent = quote.author.split(",")[0];
};

const changeColor = (color) => {
  quoteContainer.style.backgroundColor = color.secondary;
  btn.style.backgroundColor = color.primary;
  btn.style.color = color.secondary;
  title.style.color = color.secondary;
  titleBg.style.backgroundColor = color.primary;

  quoteEl.style.color = color.primary;
  author.style.color = color.primary;
};

btn.addEventListener("click", getData);
