import React from "react";
import { AiFillStar } from "react-icons/ai";

const Rating = (props) => {
  let rating = props.item_rating;
  console.log(rating);

  let res = [];
  if (rating < 2) {
    res = ["1"];
  } else if (rating === 2 && rating < 5) {
    res = ["1", "2"];
  } else if (rating >= 5) {
    res = ["1", "2", "3"];
  }
  return (
    <div>
      {res.map((item) => {
        return <AiFillStar key={item} />;
      })}
    </div>
  );
};

export default Rating;
