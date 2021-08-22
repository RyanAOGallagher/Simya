import React, { useState, useEffect } from "react";

import Data from "./input/leaderboard.json";

const Table = () => {
  const [search, setSearch] = useState("");
  const aData = Object.values(Data);
  const [error, setError] = useState(false);
  const [display, setDisplay] = useState([]);

  aData.sort((a, b) => (a.bananas > b.bananas ? -1 : 1)); //sorted data
  let j = 1;
  for (let i = 0; i < aData.length; i++) {
    if (aData[i + 1] && aData[i].bananas === aData[i + 1].bananas) {
      ///if n of bananas same as next, ranking is same
      aData[i].ranking = j;
    } else {
      aData[i].ranking = j;
      j++;
    }
  }

  const sortedData = aData.slice(0, 10);
  const topTen = aData.slice(0, 9);
  useEffect(() => {
    setDisplay(sortedData);
    const isMatched = aData.filter((item) => {
      return item.uid === search;
    });

    const uids = topTen.map((i) => i.uid);

    if (isMatched.length === 1 && !uids.includes(isMatched[0].uid)) {
      console.log(topTen.concat(isMatched));
      setDisplay(topTen.concat(isMatched));
      setError(false);
    } else {
      setError(true);
    }
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  display.map((data, i, e) => {
    if (data.uid === search) {
      data.isCurrentUser = "true";
    } else {
      data.isCurrentUser = "false";
    }
  });

  return (
    <div>
      <input
        type="text"
        value={search}
        preventdefault
        onChange={handleChange}
      ></input>
      <h1>
        {error &&
          search.length > 0 &&
          "Current user id does not exist! Please specify an existing user id!"}
      </h1>
      <table>
        <th>Name</th>
        <th>Rank</th>
        <th>Number of bananas</th>
        <th>isCurrentUser?</th>
        {display.map((data, i, e) => {
          return (
            <tr>
              <td>{data.name}</td>
              <td>{data.ranking}</td>
              <td>{data.bananas}</td>
              <td>{data.isCurrentUser}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
