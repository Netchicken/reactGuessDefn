import React from "react";
import { Card, CardText, CardTitle, CardSubtitle } from "reactstrap";
//import { ListItem } from "@material-ui/core";

//https://www.robinwieruch.de/react-list-component

const ListItem = ({ item }) => (
  <li className="list-group-item list-group-item-primary">
    <div>
      {item.id} {item}
    </div>
  </li>
);

const WinList = props => {
  const list = props.winList;
  return (
    <div className="list-group ">
      <Card className="cardBodyWinLose">
        <h5>You have won... {list.length} times</h5>
        {list.map((item, index) => {
          return (
            <ul className="list-group list-group-flush">
              <ListItem key={index} item={item} />
            </ul>
          );
        })}
      </Card>
    </div>
  );
};

export default WinList;
