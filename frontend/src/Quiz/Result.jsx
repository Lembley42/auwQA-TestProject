import React from "react";


const Result = ({ answers }) => {
    return (
      <div>
        <h2>Your answers are:</h2>
        {Object.keys(answers).map((question, index) => (
          <div key={index}>
            <p>{question}: {answers[question].join(", ")}</p>
          </div>
        ))}
      </div>
    );
  };

  
export default Result;