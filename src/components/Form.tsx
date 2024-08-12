import { useState } from "react";

export const Form = ({
  totalScore,
  wordCount,
  onFormSubmit,
}: {
  totalScore: number;
  wordCount: number;
  onFormSubmit?: () => void;
}) => {
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (error) return;

    await fetch("http://localhost:3001/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, score: totalScore, wordCount }),
    });

    setUserName("");
    onFormSubmit();
  };

  const handleInputChange = (val: string) => {
    if (!val) {
      setError("Username cannot be blank");
    } else {
      setUserName(val);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className="red block">{error}</span>
      <label htmlFor="userName">
        Enter your name:
        <input
          name="userName"
          type="text"
          value={userName}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
};
