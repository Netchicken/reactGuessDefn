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
export function CreateGamePlay() {
  
    

}
