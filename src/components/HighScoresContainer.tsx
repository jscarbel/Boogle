import { Scores } from "./BoardContainer";

export const HighScoresContainer = ({ scores }: { scores: Scores }) => {
  return (
    <div className="high-scores-container">
      <h1>Top 10 High Scores</h1>
      <ol className="scores-list">
        {scores.map((s) => {
          return (
            <li className="text-left" key={`hiscore${s.id}`}>
              <span className="username">{s.userName || "Anynomous"}</span>:{" "}
              {s.score} points, {s.wordCount} words
            </li>
          );
        })}
      </ol>
    </div>
  );
};
