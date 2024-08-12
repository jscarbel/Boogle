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
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (error || loading) return;
    setLoading(true);
    const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
    if (typeof baseUrl !== "string") return;
    try {
      const response = await fetch(`${baseUrl}/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, score: totalScore, wordCount }),
      });

      if (response.ok) {
        setLoading(false);
        onFormSubmit();
      } else {
        const failedResult = await response.json();
        console.error(failedResult);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
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
      <input
        type="submit"
        className={loading ? "disabled" : ""}
        disabled={loading}
      >
        {loading ? "Submitting..." : "submit"}
      </input>
    </form>
  );
};
