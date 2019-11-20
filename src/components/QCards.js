import React from "react";
import { Card, CardText, CardTitle, CardSubtitle } from "reactstrap";

const QCards = props => {
  const answerClicked = props.answerClicked;
  const word = props.word;
  return (
    props.answerPair.map((a, index) => (
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
          >
            {!answerClicked ? "Choose Definition" : a.word}
          </button>
        </Card>
      </div>
    ))
    
  );
};

export default QCards;
