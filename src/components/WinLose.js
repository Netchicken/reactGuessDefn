import React, { Component } from "react";
import WinList from "./WinList";
import LoseList from "./LoseList";

class WinLose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenWord: this.props.chosenWord,
      word: this.props.word,
      answer: this.props.answer,

      winList: [],
      loseList: []
    };
   // this.WinLose = this.WinLose.bind(this);
  }
  componentDidMount() {
    this.WinLose();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      this.setState({
        chosenWord: this.props.chosenWord,
        word: this.props.word,
        answer: this.props.answer
      });

      // this.updateAndNotify();
    }
  }

  WinLose() {
    this.setState({ answerClicked: true });

    if (this.props.answer === this.props.word) {
      // alert("Correct");

      this.setState(state => {
        const winList = [...state.winList, this.props.word]; //spread it, add in word
        return {
          winList //send back new list
        };
      });

      console.log(" Win " + this.state.answer);
    } else {
      console.log("Lose " + this.state.answer);

      this.setState(state => {
        const loseList = [...state.loseList, this.props.word]; //spread it, add in word
        return {
          loseList //send back new list
        };
      });
    }
  }

  render() {
    return (
      <>
        <div className="col-md-auto">
          <WinList winList={this.state.winList} />
        </div>
        <div className="col-md-auto">
          <LoseList loseList={this.state.loseList} />
        </div>
      </>
    );
  }
}
export default WinLose;
