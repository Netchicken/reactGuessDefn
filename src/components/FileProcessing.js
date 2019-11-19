// import React, { Component } from "react";
import dict from "../Assets/OxfordJson.json";

export async function loadDictionary() {
  return await dict; //JSON.parse(dict);
}

export function RandomNumber() {
  const min = 1;
  const max = dict.length;
  return min + Math.random() * (max - min);
}
//this doesn't work????
export function shuffleAnswers(array) {
  let temp = array.slice();
  for (let i = temp.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
    console.log("shuffleanswers " + temp[i]);
  }
  return temp;
}
