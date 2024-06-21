import { useState } from "react";
import { wordsDictionary } from "../words-dictionary";
import calculateScore from "../scripts/calculateScore";

const InputWord = ({
  wordSet,
  onWordSubmit,
}: {
  wordSet: Set<string>;
  onWordSubmit: Function;
}) => {
  const [currentWord, setCurrentWord] = useState<string>("");

  const handleInputChange = (event) => {
    setCurrentWord(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleWordSubmit(event);
    }
  };

  const handleWordSubmit = (event) => {
    event.preventDefault();
    if (currentWord.length < 3) return;

    const isWordInDictionary = wordsDictionary.has(currentWord);
    if (!isWordInDictionary) return;

    onWordSubmit(currentWord);
    setCurrentWord("");
  };

  return (
    <div className="word-list-container">
      <div className="word-list">
        {Array.from(wordSet).map((word, index) => (
          <div key={index} className="word-item">
            {word}
          </div>
        ))}
      </div>
      <div className="input-word">
        <input
          type="text"
          value={currentWord}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          placeholder="Enter a word"
        />
        <button onClick={handleWordSubmit}>Add Word</button>
      </div>
    </div>
  );
};

export default InputWord;
