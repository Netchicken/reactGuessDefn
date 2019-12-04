import React, { Component } from "react";
import {
  GenerateGameWords,
    loadDictionary,
  shuffleAnswers
  } from "./FileProcessing";
import { Card, CardText, CardTitle, CardSubtitle } from "reactstrap";
import WinList from "./WinList";
import LoseList from "./LoseList";
//import QCards from "./QCards";

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
     loseList: [],
     // loseList: [
      //   {
      //     word: "",
      //     answer: ""
      //   }
      // ]

      //  isExpanded:false
    };
    this.WinLose = this.WinLose.bind(this);
    this.RetestLoseWords = this.RetestLoseWords.bind(this);
  }

  componentDidMount() {
    this.loadUpDictionary();
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
          this.WordGeneration(); //run when completed above
        }
      );
      //  console.log(this.state.dictionary);
    });
  }

  NewGame() {
    this.setState({ answerClicked: false });
    this.WordGeneration();
    //  console.log("rnd " + this.state.rnd);
  }

  WordGeneration() {
    const generatedArray = GenerateGameWords("", this.state.dictionary);
    //console.log("word " + generatedArray[0].word);
    //   console.log("defn " + generatedArray[0].answer);

    //need to get the word out before shuffling - we can't find it otherwise
    const result = shuffleAnswers(generatedArray);
    this.setState(
      () => ({
        word: generatedArray[0].word,
        answer: generatedArray[0].answer,
        answerPair: result 
      }),
      () => {
        //run stuff after saving
      }
    );
  }

  WinLose(a) {
    this.setState({ answerClicked: true });

    if (a.answer === this.state.answer) {
      this.setState(state => {
        const winList = [...state.winList, state.word]; //spread it, add in word
        return {
          //this return means to return a new winlist to the state, not return from winlose
          winList //send back new list
        };
      });

 //     console.log(" Win " + this.state.answer);
    } else {
 //     console.log("Lose " + this.state.word + "   " + this.state.answer);
   //   var loseEntry = { word: this.state.word, answer: this.state.answer };

      this.setState(state => {
        const loseList = [...state.loseList, this.state.word]; //spread it, add in word and answer
        return {
          loseList //send back new list
        };
      });
      //  alert("Wrong the answer to your definition is " + this.state.answer);
    }
  }

  RetestLoseWords() {
    // this.setState({ answerClicked: false });

    const generatedArray = GenerateGameWords(
      this.state.loseList,
      this.state.dictionary
    );
    //need to get the word out before shuffling - we can't find it otherwise
    const result = shuffleAnswers(generatedArray);

    this.setState(
      prevState => ({
        loseList: prevState.loseList.filter(
          word => word != generatedArray[0].word
        ), //build a new list, from the prevstate with the word we are testing removed. Remove the word from the list
        answerClicked: false,
        word: generatedArray[0].word, //take the first word from the list
        answer: generatedArray[0].answer, //take the first answer from the list
        answerPair: result //  shuffleAnswers(AnswersPairArray)
      }),
      () => {
        //run stuff after saving
      }
    );

    //retested word is not at first position
    // console.log("lose word " + this.state.word);
    // console.log("lose defn " + this.state.answer);
    // const { loseList } = this.state.loseList;

    //  console.log(...loseList);
  }

  render() {
    const { isLoaded, word, answerPair, answerClicked } = this.state; //pass across the state

    if (!isLoaded) {
      return <div>Loading ....</div>;
    } else {
      return (
        <div className="container-fluid  justify-content-md-center">
          <div className="row  justify-content-md-center">
            <div className="col  col-sm-auto">
              <button
                className="button btn btn-success btn-lg"
                onClick={() => this.NewGame()}
                // disabled={answerClicked}
              >
                {"Play - " + word}
              </button>

              {/* <div className="row">
                {
                  <QCards
                    answerPair={answerPair}
                    answerClicked={this.state.answerClicked}
                    word={word}
                    winList={this.state.winList}
                    loseList={this.state.loseList}
                  />
                }
              </div> */}
              <div className="row">
                {answerPair.map((a, index) => (
                  <div className="col col-12 col-sm-4 col-md-3 " key={index}>
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
                        disabled={answerClicked}
                      >
                        {!answerClicked ? "Choose Definition" : a.word}
                      </button>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="row  justify-content-md-center">
                <div className="col-md-auto">
                  <WinList winList={this.state.winList} />
                </div>
                <div className="col-md-auto">
                  <LoseList loseList={this.state.loseList} />
                  <button
                    className="buttonSubmit btn btn-primary"
                    onClick={() => this.RetestLoseWords()}
                  >
                    Retest
                  </button>
                </div>
              </div>
              <p></p>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default GamePlay;
