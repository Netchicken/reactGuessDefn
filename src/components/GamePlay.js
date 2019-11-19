import React, { Component } from "react";
import { loadDictionary, shuffleAnswers } from "./FileProcessing";
import { Card, CardText, CardTitle, CardSubtitle } from "reactstrap";
import WinList from "./WinList";
import LoseList from "./LoseList";

//keep this for async ideas with state
//https://stackoverflow.com/questions/58794712/how-to-i-make-setstate-run-synchronously-in-reactjs/58795004#58795004

class GamePlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dictionary: [],
      isLoaded: false,
      answerClicked: false,
      answers: [],
      rnd: 0,
      word: "",
      answer: "",
      answerPair: [],
      prevWord: "",
      prevAnswer: "",
      nextWord: "",
      nextAnswer: "",
      rndAnswer: "",
      winList: [],
      loseList: []
    };
    this.WinLose = this.WinLose.bind(this);
  }

  //  "Word": "Aardvark",
  //     "Definition": "n. Mammal with a tubular snout and a long tongue, feeding on termites. [afrikaans]"

  componentDidMount() {
    this.loadUpDictionary();
    //this.DictionaryLength();
    //this.RandomNumber();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dictionary !== prevState.dictionary) {
    }
  }
  //The idea is that let the this.loadUpDictionary and this.setState run first, and since setState allows to have callback, you can have this.DictionaryLength() to do just that https://medium.learnreact.com/setstate-takes-a-callback-1f71ad5d2296
  loadUpDictionary() {
    loadDictionary().then(d => {
      this.setState(
        () => ({
          dictionary: d,
          isLoaded: true,
          answerClicked: false
        }),
        () => {
          this.RandomNumber();
        }
      );
      //  console.log(this.state.dictionary);
    });
  }

  NewGame() {
    this.setState({ answerClicked: false });
    this.RandomNumber();
    console.log("rnd " + this.state.rnd);
  }

  RandomNumber() {
    const min = 0 + 5; //5 is to stop out of bound errors
    const max = 26731 - 5;
    const rnd = Math.floor(Math.random() * (max - min + 1) + min);
    const rnd2 = Math.floor(Math.random() * (max - min + 1) + min);

    const word = this.state.dictionary.Entries[rnd].Word;
    const answer = this.state.dictionary.Entries[rnd].Definition;
    const prevWord = this.state.dictionary.Entries[rnd - 1].Word;
    const prevAnswer = this.state.dictionary.Entries[rnd - 1].Definition;
    const nextWord = this.state.dictionary.Entries[rnd + 1].Word;
    const nextAnswer = this.state.dictionary.Entries[rnd + 1].Definition;
    const next2Word = this.state.dictionary.Entries[rnd + 2].Word;
    const next2Answer = this.state.dictionary.Entries[rnd + 2].Definition;

    const rndWord = this.state.dictionary.Entries[rnd2].Word;
    const rndAnswer = this.state.dictionary.Entries[rnd2].Definition;

    const AnswersArray = [answer, prevAnswer, nextAnswer, rndAnswer];

    let q = { word: word, answer: answer };
    let pq = { word: prevWord, answer: prevAnswer };
    let nq = { word: nextWord, answer: nextAnswer };
    let rq = { word: rndWord, answer: rndAnswer };
    let n2q = { word: next2Word, answer: next2Answer }; //not used
    const AnswersPairArray = [q, pq, nq, rq];

    this.setState(
      () => ({
        rnd: rnd,
        word: word,
        answer: answer,
        prevWord: this.state.dictionary.Entries[rnd - 1].Word,
        prevAnswer: this.state.dictionary.Entries[rnd - 1].Definition,
        nextWord: this.state.dictionary.Entries[rnd + 1].Word,
        nextAnswer: this.state.dictionary.Entries[rnd + 1].Definition,
        rndAnswer: this.state.dictionary.Entries[rnd2].Definition,
        answers: AnswersArray,
        answerPair: shuffleAnswers(AnswersPairArray)
      }),
      () => {
        //  console.log("answers[0] =  " + this.state.answers[0]);
        //  this.shuffleAnswers();
        //   this.setState({ answers: shuffleAnswers(this.state.answers) });
        //  this.shuffleAnswerPair();
      }
    );
  }

  // shuffleAnswers = () => {
  //   let temp = this.state.answers.slice();
  //   for (let i = temp.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     [temp[i], temp[j]] = [temp[j], temp[i]];
  //   }
  //  // console.log("shuffle  answers Temp  " + temp);
  //   this.setState({ answers: temp });
  // };

  // shuffleAnswerPair = () => {
  //   let temp = this.state.answerPair.slice();
  //   for (let i = temp.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * (i + 1));
  //     [temp[i], temp[j]] = [temp[j], temp[i]];
  //   }

  //   // let q = temp[0];
  //   // console.log("shuffle  single Temp  " + q.word + " " + q.answer);
  //   // console.log("shuffle  answerPair Temp  " + temp);
  //   // console.log("answerPair Temp  " + temp[0]);
  //   this.setState({ answerPair: temp });
  // };

  WinLose(a) {
    this.setState({ answerClicked: true });

    if (a.answer === this.state.answer) {
      // alert("Correct");

      this.setState(state => {
        const winList = [...state.winList, state.word]; //spread it, add in word
        return {
          winList //send back new list
        };
      });

      console.log(" Win " + this.state.answer);
    } else {
      console.log("Lose " + this.state.answer);

      this.setState(state => {
        const loseList = [...state.loseList, state.word]; //spread it, add in word
        return {
          loseList //send back new list
        };
      });

      //  alert("Wrong the answer to your definition is " + this.state.answer);
    }

    //   this.state.winList.map(i => console.log("winList " + i.text));

    //this.NewGame();
  }

  render() {
    const {
      isLoaded,
      dictionary,
      rnd,
      word,
      nextWord,
      prevWord,
      rndAnswer,
      answers,
      answerPair,
      answerClicked
    } = this.state; //pass across the state

    if (!isLoaded) {
      return <div>Loading ....</div>;
    } else {
      return (
        <div className="container-fluid  justify-content-md-center">
          <div className="row  justify-content-md-center">
            {/* <div className="col-md-auto">
              <button
                className="button btn btn-danger btn-lg"
                onClick={() => this.NewGame()}
              >
                {!answerClicked ? "Play" : word}
              </button>
            </div> */}
            <div className="col-md-auto">
              <button
                className="button btn btn-success btn-lg"
                onClick={() => this.NewGame()}
              >
                {"Play - " + word}
              </button>

              <div className="row">
                {answerPair.map((a, index) => (
                  <div className="col col-md-3 col-sm-6" key={index}>
                    <Card className="cardBody">
                      <CardTitle className="conditions ">
                        {!answerClicked ? word : a.word}
                      </CardTitle>
                      {answerClicked ? (
                        <CardSubtitle className="cardSubtitle">
                          {" "}
                          {a.word === word ? "Correct!" : "Incorrect"}
                        </CardSubtitle>
                      ) : (
                        " "
                      )}
                      <CardText>{a.answer}</CardText>

                      <button
                        className="buttonSubmit btn btn-primary"
                        value={a}
                        key={index}
                        onClick={() => this.WinLose(a)}
                      >
                        {!answerClicked ? "Choose Definition" : a.word}
                      </button>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-md-auto">
                  <WinList winList={this.state.winList} />
                </div>
                <div className="col-md-auto">
                  <LoseList loseList={this.state.loseList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default GamePlay;
