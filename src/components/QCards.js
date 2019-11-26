import React, { Component } from "react";
import { Card, CardText, CardTitle, CardSubtitle } from "reactstrap";
import WinList from "./WinList";
import LoseList from "./LoseList";

class QCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerPair: this.props.answerPair,
      answerClicked: this.props.answerClicked,
      word: this.props.word,
      chosenWord: ""
    };
  }
  // componentDidMount() {
  //   this.setState({
  //     answerClicked: false
  //   });
  // }

  //forces the component to update when the props change
  componentDidUpdate(prevProps) {
    if (prevProps.answerPair !== this.props.answerPair) {
      this.setState({
        answerClicked: !this.props.answerPair,
        answerPair: this.props.answerPair,
        word: this.props.word
      });

      // this.updateAndNotify();
    }
  }

  buttonClick(event, a) {
    this.setState({
      answerClicked: true,
      chosenWord: a
    });
    console.log("QCards word " + a.word);
  }

 

  render() {
    const { word, answerClicked, chosenWord } = this.state;
    return (
      <div className="row">
        {this.props.answerPair.map((a, index) => (
          <div className="col col-12 col-sm-4 col-md-3 " key={index}>
            <Card className="cardBody">
              <CardTitle className="conditions ">
                {!answerClicked ? word : a.word}
              </CardTitle>
              {answerClicked ? (
                <CardSubtitle className="cardSubtitle">
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
                onClick={this.buttonClick.bind(this, a.word)}
                disabled={answerClicked}
              >
                {!answerClicked ? "Choose Definition" : a.word}
              </button>
            </Card>
          </div>
        ))}
        <div className="row  justify-content-md-center">
          <div className="col-md-auto">
            <WinList winList={this.props.winList} />
          </div>
          <div className="col-md-auto">
            <LoseList loseList={this.props.loseList} />
          </div>
        </div>
      </div>
    );
  }
}
export default QCards;
