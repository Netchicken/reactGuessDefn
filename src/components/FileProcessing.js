// import React, { Component } from "react";
import dict from "../Assets/OxfordJson.json";

export async function loadDictionary() {
  return await dict; //JSON.parse(dict);
}

export function GenerateRND() {
  const min = 0 + 5; //5 is to stop out of bound errors
  const max = 26731 - 5; //26731
  const rnd = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("rnd " + rnd);
  return rnd;
}

export function GenerateRNDLose(loselist) {
  const min = 0; //5 is to stop out of bound errors
  const max = loselist.length - 1; //26731
  const rnd = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("rnd " + rnd);
  return rnd;
}

export function shuffleAnswers(array) {
  let temp = array.slice();
  for (let i = temp.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
   // console.log("shuffleanswers " + temp[i]);
  }
  return temp;
}

export function GenerateGameWords(loseList, dictionary) {
  var rnd = 0;
  var rnd2 = 0;
  if (loseList.length !== 0) {
  //  rnd = GenerateRNDLose(loseList); //get a random number from the loselist
    rnd = 0; // just get the first word from the list 
    
    var loseWord = loseList[0]; //get the first word from that list need to start with 1
    rnd = dictionary.Entries.findIndex(entry => entry.Word === loseWord); //match it with the word in the dict and generate the Index to get the rest of the words

console.log("RND FOR  LOSELIST " + rnd)

//version 1 Get the first word on the list and test that. Remove it from the list. If person gets it wrong again it will be auto added into the end. V2 get a random word from the list

  } else {
    rnd = GenerateRND();
  }
  rnd2 = GenerateRND(); //generate random word

  //this could be combined with below, but its clear.  
  const word = dictionary.Entries[rnd].Word;
  const answer = dictionary.Entries[rnd].Definition;
  const prevWord = dictionary.Entries[rnd - 1].Word;
  const prevAnswer = dictionary.Entries[rnd - 1].Definition;
  const nextWord = dictionary.Entries[rnd + 1].Word;
  const nextAnswer = dictionary.Entries[rnd + 1].Definition;
  const next2Word = dictionary.Entries[rnd + 2].Word;
  const next2Answer = dictionary.Entries[rnd + 2].Definition;

  const rndWord = dictionary.Entries[rnd2].Word;
  const rndAnswer = dictionary.Entries[rnd2].Definition;

  // const AnswersArray = [answer, prevAnswer, nextAnswer, rndAnswer];

  //multisized entries, not just 4
  let q = {
    word: word,
    answer: answer
  };
  
  let pq = {
    word: prevWord,
    answer: prevAnswer
  };
    let nq = {
    word: nextWord,
    answer: nextAnswer
  };
  let rq = {
    word: rndWord,
    answer: rndAnswer
  };
  let n2q = {
    word: next2Word,
    answer: next2Answer
  }; //not used
  const AnswersPairArray = [q, pq, nq, rq];
  return AnswersPairArray;

}



//old code

// WordGeneration() {
//     //  const rnd = GenerateRND(); //Math.floor(Math.random() * (max - min + 1) + min);
//     // const rnd2 = GenerateRND();

//     // const word = this.state.dictionary.Entries[rnd].Word;
//     // const answer = this.state.dictionary.Entries[rnd].Definition;
//     // const prevWord = this.state.dictionary.Entries[rnd - 1].Word;
//     // const prevAnswer = this.state.dictionary.Entries[rnd - 1].Definition;
//     // const nextWord = this.state.dictionary.Entries[rnd + 1].Word;
//     // const nextAnswer = this.state.dictionary.Entries[rnd + 1].Definition;
//     // const next2Word = this.state.dictionary.Entries[rnd + 2].Word;
//     // const next2Answer = this.state.dictionary.Entries[rnd + 2].Definition;

//     // const rndWord = this.state.dictionary.Entries[rnd2].Word;
//     // const rndAnswer = this.state.dictionary.Entries[rnd2].Definition;

//   //  const AnswersArray = [answer, prevAnswer, nextAnswer, rndAnswer];
// //multisized entries, not just 4
//     // let q = { word: word, answer: answer };
//     // let pq = { word: prevWord, answer: prevAnswer };
//     // let nq = { word: nextWord, answer: nextAnswer };
//     // let rq = { word: rndWord, answer: rndAnswer };
//     // let n2q = { word: next2Word, answer: next2Answer }; //not used
//     // const AnswersPairArray = [q, pq, nq, rq];
//     const generatedArray = GenerateGameWords("", this.state.dictionary);
//     this.setState(
//       () => ({
//         //   rnd: rnd,
//         word: generatedArray[0].Word,
//         answer: generatedArray[0].Definition,
//         // prevWord: this.state.dictionary.Entries[rnd - 1].Word,
//         // prevAnswer: this.state.dictionary.Entries[rnd - 1].Definition,
//         // nextWord: this.state.dictionary.Entries[rnd + 1].Word,
//         // nextAnswer: this.state.dictionary.Entries[rnd + 1].Definition,
//         // rndAnswer: this.state.dictionary.Entries[rnd2].Definition,
//         //answers: AnswersArray,
//         answerPair: generatedArray //  shuffleAnswers(AnswersPairArray)
//       }),
//       () => {
//         //  console.log("answers[0] =  " + this.state.answers[0]);
//         //  this.shuffleAnswers();
//         //   this.setState({ answers: shuffleAnswers(this.state.answers) });
//         //  this.shuffleAnswerPair();
//       }
//     );
//   }
