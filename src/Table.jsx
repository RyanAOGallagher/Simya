import React, { useState, useEffect } from "react";

import JsonData from "./input/leaderboard.json";

const Table = () => {
  const [search, setSearch] = useState("");
  const PeopleData = Object.values(JsonData);
  const [error, setError] = useState(false);
  const [display, setDisplay] = useState([]);

  PeopleData.sort((a, b) => (a.bananas > b.bananas ? -1 : 1));

  let rank = 1;

  for (let i = 0; i < PeopleData.length; i++) {
    if (
      PeopleData[i + 1] &&
      PeopleData[i].bananas === PeopleData[i + 1].bananas
    ) {
      PeopleData[i].ranking = rank;
    } else {
      PeopleData[i].ranking = rank;
      rank++;
    }
  }

  const topTen = PeopleData.slice(0, 10);
  const topNine = PeopleData.slice(0, 9);

  useEffect(() => {
    setDisplay(topTen);
    const isMatched = PeopleData.filter((item) => {
      return item.uid === search;
    });

    const uids = topNine.map((i) => i.uid);

    if (isMatched.length === 1 && !uids.includes(isMatched[0].uid)) {
      console.log(topNine.concat(isMatched));
      setDisplay(topNine.concat(isMatched));
      setError(false);
    } else if (isMatched.length === 1 && uids.includes(isMatched[0].uid)) {
      setError(false);
    } else {
      setError(true);
    }
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  display.map((data) => {
    if (data.uid === search) {
      data.isCurrentUser = "yes";
    } else {
      data.isCurrentUser = "no";
    }
  });

  return (
    <div>
      <input
        type="text"
        value={search}
        preventdefault
        onChange={handleChange}
        placeholder="Enter ID"
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
        {display.map((data) => {
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
