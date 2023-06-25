import React, { useEffect, useState } from "react";
import "./highscores.css";
import useUserHooks from "../UserHooks";

function HighscoresPage() {
  const { fetchHighScores } = useUserHooks();
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    handleFetchHighScores();
  }, []);

  const handleFetchHighScores = async () => {
    try {
      const response = await fetchHighScores();
      if (response.status === true) {
        setHighScores(response.message);
      } else console.log(response.error);
    } catch (error) {
      console.error("Error fetching high scores:", error);
    }
  };

  const convertDate = (myDate) => {
    const dateStr = myDate;
    const date = new Date(dateStr);

    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    };

    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  console.log(highScores);
  return (
    <div className="wrapper">
      <h1>The Hall Of Fame</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Nickname</th>
            <th>Score</th>
            <th className="date">Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(highScores) && highScores.length !== 0
            ? highScores.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td className="nick">{user.nickname}</td>
                  <td>{user.result}</td>
                  <td>{convertDate(user.date)}</td>
                </tr>
              ))
            : "No data yet"}
        </tbody>
      </table>

      {/* <!-- ICONS CLOUDS--> */}
      <div class="container-cloud">
        {/* <!-- First cloud --> */}
        <svg
          version="1.1"
          class="svg-cloud01"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMinYMin meet"
        >
          <g>
            <path d="M642.02-364.11c-0.772,0-1.519,0.114-2.229,0.313c-0.17-6.744-5.679-12.162-12.464-12.162   c-4.368,0-8.201,2.251-10.428,5.65c-1.38-2.61-4.117-4.393-7.275-4.393c-2.621,0-4.95,1.229-6.456,3.139   c-2.865-6.496-9.357-11.031-16.913-11.031c-8.99,0-16.479,6.42-18.138,14.926c-0.937-0.248-1.911-0.393-2.925-0.393   c-6.312,0-11.427,5.116-11.427,11.427c0,0.907,0.117,1.787,0.317,2.634h95.921c0.146-0.609,0.229-1.243,0.229-1.896   C650.233-360.433,646.556-364.11,642.02-364.11z" />
          </g>
          <g>
            <path d="M90.02,48.188c-0.771,0-1.518,0.113-2.229,0.312c-0.17-6.744-5.678-12.162-12.463-12.162   c-4.369,0-8.201,2.251-10.428,5.65c-1.381-2.61-4.117-4.393-7.275-4.393c-2.621,0-4.951,1.229-6.457,3.139   c-2.865-6.496-9.357-11.031-16.913-11.031c-8.99,0-16.479,6.42-18.138,14.926c-0.937-0.248-1.911-0.393-2.925-0.393   c-6.312,0-11.427,5.116-11.427,11.427c0,0.907,0.117,1.786,0.317,2.634h95.92c0.146-0.609,0.23-1.243,0.23-1.896   C98.234,51.863,94.557,48.188,90.02,48.188z" />
          </g>
        </svg>
        {/* <!-- Second cloud --> */}
        <svg
          version="1.1"
          class="svg-cloud02"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMinYMin meet"
        >
          <g>
            <path d="M642.02-364.11c-0.772,0-1.519,0.114-2.229,0.313c-0.17-6.744-5.679-12.162-12.464-12.162   c-4.368,0-8.201,2.251-10.428,5.65c-1.38-2.61-4.117-4.393-7.275-4.393c-2.621,0-4.95,1.229-6.456,3.139   c-2.865-6.496-9.357-11.031-16.913-11.031c-8.99,0-16.479,6.42-18.138,14.926c-0.937-0.248-1.911-0.393-2.925-0.393   c-6.312,0-11.427,5.116-11.427,11.427c0,0.907,0.117,1.787,0.317,2.634h95.921c0.146-0.609,0.229-1.243,0.229-1.896   C650.233-360.433,646.556-364.11,642.02-364.11z" />
          </g>
          <g>
            <path d="M90.02,48.188c-0.771,0-1.518,0.113-2.229,0.312c-0.17-6.744-5.678-12.162-12.463-12.162   c-4.369,0-8.201,2.251-10.428,5.65c-1.381-2.61-4.117-4.393-7.275-4.393c-2.621,0-4.951,1.229-6.457,3.139   c-2.865-6.496-9.357-11.031-16.913-11.031c-8.99,0-16.479,6.42-18.138,14.926c-0.937-0.248-1.911-0.393-2.925-0.393   c-6.312,0-11.427,5.116-11.427,11.427c0,0.907,0.117,1.786,0.317,2.634h95.92c0.146-0.609,0.23-1.243,0.23-1.896   C98.234,51.863,94.557,48.188,90.02,48.188z" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default HighscoresPage;
